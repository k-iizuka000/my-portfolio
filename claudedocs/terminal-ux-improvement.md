# ターミナルUX改善 設計ドキュメント

## 背景 / 目的
ターミナル風ポートフォリオ（`src/components/terminal/`）の操作性を、mock（`mock/🌟03c-terminal-phosphor.html`）の体験に寄せて改善する。

対象の改善点:
1. ヒントテキストから指マーク（💡）を削除
2. 画面上どこをクリックしても入力フォームへフォーカス
3. マウスによるテキスト範囲選択を有効化（現在は `preventDefault` で阻害）
4. mockの `text-glow` / `crt-glow` を参考にグロー表現を追加（既存CRT表現を拡張）

非対象（今回やらない）:
- 外部リンクの `↗` 表示の削除（要件で「残す」）
- IMEの挙動変更（既存の `data-composing` を維持し壊さない）
- コマンド仕様・出力内容の変更

---

## 現状整理（関連箇所）
- `Prompt.tsx`
  - 入力のフォーカス/キャレット末尾固定（IME中は固定しない）
  - `onMouseDown` で `e.preventDefault()` しており、マウス選択（ドラッグ）が成立しない
  - フォーカスはプロンプトコンテナクリック時のみ
- `TerminalWindow.tsx`
  - 画面全体レイアウトは保持しているが、「どこでもクリックでフォーカス」を実装するためのフックが無い
- `globals.css`
  - CRT系クラス（`.crt`, `.scanlines`, `.terminal-glow`, `.terminal-text-glow`）は既に存在
  - mockが持つ命名（`.text-glow`, `.crt-glow`）は未定義

---

## 修正対象ファイル一覧
- `src/components/terminal/Prompt.tsx`
- `src/components/terminal/TerminalApp.tsx`
- `src/components/terminal/TerminalWindow.tsx`
- `src/components/terminal/OutputBlock.tsx`（グロー適用の粒度調整）
- `src/components/terminal/AutoCompleteList.tsx`（選択中候補のグロー強化）
- `src/app/globals.css`

---

## 要求事項ごとの修正方針

### 1) 指マーク（💡）削除
対象: `Prompt.tsx` のヒント表示。

方針:
- 文言の先頭 `💡 ` を取り除く（テキスト自体は維持）。
- クラス `.hint-text` は既存のまま使用。

---

### 2) 画面全体クリックでフォーカス
狙い:
- ターミナル領域の「どこをクリックしても入力できる」体験にする。

実装方針（重要: 範囲選択と干渉しない）:
- `onMouseDown` ではなく **`onClick`（または `onClickCapture`）でフォーカス**を行う。
  - ドラッグ選択中は通常 `click` が発火しないため、範囲選択と両立しやすい。
- `Prompt` の内部 `inputRef` を親から操作できるようにする。
  - `Prompt` を `forwardRef` 化し、親から `focusToEnd()` を呼べる **imperative handle** を提供する。

イベントのガード（リンク等を壊さない）:
- クリックターゲットが `a/button/input/textarea/select` などの操作要素の場合はフォーカス処理をスキップ。
  - 例: `target.closest("a,button,input,textarea,select,[data-no-terminal-focus]")` が真ならreturn
- （任意）選択レンジが存在する場合はスキップ: `window.getSelection()?.type === "Range"`

影響範囲:
- `TerminalWindow` に「ルートコンテナのクリックを受け取るためのprops」を追加する。
- `TerminalApp` で `Prompt` ref を保持し、`TerminalWindow` にハンドラを渡す。

---

### 3) 範囲選択の有効化（preventDefaultの撤廃）
対象: `Prompt.tsx` の `onMouseDown`。

課題:
- 現状の `e.preventDefault()` が、クリック/ドラッグによるキャレット移動・選択開始を阻害している。

方針:
- `onMouseDown` での `preventDefault` を廃止し、マウス選択を成立させる。
- ただし「通常クリック時にキャレットが末尾に戻る」ターミナルらしさは維持したいので、以下の形に置き換える。

推奨実装（IMEを壊さない）:
- `onPointerDown`（または `onMouseDown`）で「マウス起点フォーカス」フラグを立てる（refで保持）。
- `onFocus` では、上記フラグが立っている場合は `forceCaretToEnd()` を **呼ばない**（選択開始を邪魔しない）。
- `onMouseUp`（入力要素上）で、
  - IME中でない（`data-composing` なし）
  - かつ選択が無い（`selectionStart === selectionEnd`）
  - のときだけ `forceCaretToEnd()` を呼び、通常クリックでの末尾固定を維持する。

補足:
- 出力テキストの範囲選択は、現状CSS上 `user-select: none` 等が見当たらないため基本的に可能な想定。
- 今回の要件は「preventDefaultで防止されている」点の解消が主目的なので、Prompt入力の選択成立を最優先に扱う。

---

### 4) ターミナルらしさ（グロー効果）強化
狙い:
- mockの `.text-glow` / `.crt-glow` の見た目に寄せつつ、現実装（`.crt`, `.terminal-glow`, `.terminal-text-glow`）を活かして最小変更で統一する。

方針:
- `globals.css` に mock互換の **`.text-glow` / `.crt-glow`** を追加する（既存クラスは維持）。
  - `.text-glow` は `.terminal-text-glow` 相当（テキストシャドウ強化）
  - `.crt-glow` は `.terminal-glow` 相当（外枠/内側のボックスシャドウ）
- `TerminalWindow.tsx` の外枠に `.crt-glow` を付与（もしくは置換）。
- 視認性を上げたい箇所（例: `$`、コマンドエコー、補完の選択中行）へ `.text-glow` を付与。

適用候補:
- `OutputBlock.tsx`
  - コマンドエコー行（`$` とコマンド文字列）
- `Prompt.tsx`
  - `$`（prompt記号）
- `AutoCompleteList.tsx`
  - `activeIndex` 行に `.text-glow` を追加（選択中を強調）

---

## 各ファイルの具体的な修正内容

### `src/components/terminal/Prompt.tsx`
- ヒント文言から `💡` を削除
- `onMouseDown` の `preventDefault()` を撤廃
- マウス選択と「通常クリック時の末尾固定」を両立するイベント構成に変更
  - 例: `onPointerDown` / `onFocus` / `onMouseUp` を使った制御
- 親からフォーカスできるよう `forwardRef` + `useImperativeHandle` を導入
  - 公開するメソッド案:
    - `focus()`（単純フォーカス）
    - `focusToEnd()`（フォーカス + `forceCaretToEnd()`）
- IME対応は維持
  - `data-composing` の運用と `nativeEvent.isComposing` の早期returnを維持

### `src/components/terminal/TerminalApp.tsx`
- `Prompt` の ref を保持（`useRef<PromptHandle>(null)`）
- 画面全体クリックで `promptRef.current?.focusToEnd()` を呼ぶハンドラを用意
- ハンドラ内で「リンク等の操作要素」を除外するガードを実装

### `src/components/terminal/TerminalWindow.tsx`
- ルートクリックを受け取る props を追加（例: `onRootClick?: React.MouseEventHandler<HTMLDivElement>`）
- 最外層のラッパー（`w-screen min-h-[100svh] ...`）に `onClick={onRootClick}` を付与
  - これにより「画面上どこでもクリックでフォーカス」を満たす

### `src/components/terminal/OutputBlock.tsx`
- コマンドエコー部分に `.text-glow` を付与（視認性/ターミナル感の向上）
  - 外部リンクの `↗` は現状維持

### `src/components/terminal/AutoCompleteList.tsx`
- 選択中行（`index === activeIndex`）に `.text-glow` を追加
  - 背景色（`bg-phosphor/20`）はそのまま

### `src/app/globals.css`
- `.text-glow` / `.crt-glow` を `@layer components` に追加
  - `.text-glow`: `text-shadow` 強化（mockの `.text-glow` 相当）
  - `.crt-glow`: `box-shadow` 強化（mockの `.crt-glow` 相当）
- 既存の `.terminal-glow` / `.terminal-text-glow` は残し、呼称統一のために併存させる

---

## CSSクラス追加・変更点（一覧）
追加（`src/app/globals.css`）:
- `.text-glow`
- `.crt-glow`

利用箇所:
- `.crt-glow`: `TerminalWindow` のメインコンテナ
- `.text-glow`: Prompt記号、コマンドエコー、補完の選択中行 など

---

## 注意事項 / リスク
- IME対応を壊さない
  - `compositionstart/end` と `nativeEvent.isComposing` の扱いを維持し、IME変換中にキャレット末尾固定を走らせない
- 「画面全体クリックでフォーカス」と「範囲選択」を両立する
  - フォーカス付与は `mousedown` ではなく `click` で行う（ドラッグ選択の阻害を避ける）
  - クリックターゲットがリンク等の場合はフォーカス処理をスキップ（遷移/新規タブを壊さない）
- アクセシビリティ
  - `ref` 経由のフォーカス移動が過剰にならないよう、操作要素クリック時は除外する
- 視覚効果（グロー）の強度
  - 影が強すぎると可読性低下や滲みが出るため、既存値（`.terminal-*`）と同等〜少し強い程度に留める

---

## 動作確認チェックリスト
- ヒントテキストから `💡` が消えている
- 画面の余白/出力エリア/タイトルバーをクリックしても入力にフォーカスが移る
- 出力テキストをドラッグして範囲選択できる（選択中に勝手にフォーカスが奪われない）
- 入力欄でもドラッグ選択ができる（必要に応じて）
- IME変換中にキャレット固定が走らず、変換候補の選択/確定ができる
- 外部リンククリックで新規タブが開き、`↗` 表示は残っている
- グロー（`.text-glow` / `.crt-glow`）が適用され、mockに近い「発光感」が出ている

