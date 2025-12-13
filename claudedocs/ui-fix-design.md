# UI差異修正 設計ドキュメント（mock準拠）

## 背景
ターミナル風ポートフォリオサイト（実装）と、mock（`mock/🌟03c-terminal-phosphor.html`）のUIに差異がある。  
設計で追加した機能（フルスクリーン、タイプライター効果等）以外の見た目を、mockに合わせる。

## 対象差異（本ドキュメントのスコープ）
- ターミナル背景色
- placeholder の追加と placeholder 色
- ヒントテキスト（入力欄の下）
- グロー（外枠）/ テキストグロー（文字）の強さ
- カーソルの表示位置（入力文字の直後）
- ターミナル内リンクの見た目（青リンク化の抑止、`.crt` に追従）

---

## 修正ファイル: `src/app/globals.css`

### 修正箇所1: `:root` の `--terminal-bg`（10行目）
- Before:
  ```css
  :root {
    --terminal-bg: #020617;
    --phosphor-green: #4ade80;
    --phosphor-green-dim: rgba(74, 222, 128, 0.65);
    --crt-glow: 0 0 12px rgba(74, 222, 128, 0.45);
    --font-jetbrains-mono: 'JetBrains Mono', monospace;
  }
  ```
- After:
  ```css
  :root {
    --terminal-bg: #0f1f1a;
    --phosphor-green: #4ade80;
    --phosphor-green-dim: rgba(74, 222, 128, 0.65);
    --crt-glow: 0 0 10px rgba(74, 222, 128, 0.6);
    --font-jetbrains-mono: 'JetBrains Mono', monospace;
  }
  ```
- 理由:
  - mockのターミナル背景（`#0f1f1a`）に揃える（差異1）。
  - `.crt` の `text-shadow: var(--crt-glow);` が暗めだったため、mockの `text-shadow` 値に合わせる（差異5）。

### 修正箇所2: `.terminal-glow`（77–81行目）
- Before:
  ```css
  .terminal-glow {
    box-shadow:
      inset 0 0 60px rgba(74, 222, 128, 0.1),
      0 0 30px rgba(74, 222, 128, 0.15);
  }
  ```
- After:
  ```css
  .terminal-glow {
    box-shadow:
      0 0 15px rgba(74, 222, 128, 0.3),
      inset 0 0 15px rgba(74, 222, 128, 0.1);
  }
  ```
- 理由:
  - mockの `.crt-glow` の見た目（強すぎない外側/内側グロー）に合わせる（差異4）。

### 修正箇所3: ターミナル内リンクの上書き（`@layer components` 内に追加）
- Before:
  ```css
  a {
    @apply transition-colors duration-200 text-blue-400 hover:text-blue-300;
  }
  ```
- After:
  ```css
  a {
    @apply transition-colors duration-200 text-blue-400 hover:text-blue-300;
  }

  /* ターミナル内（.crt）だけは、mock同様に青リンク化/hover変化を抑止する */
  .crt a {
    color: inherit;
    text-shadow: inherit;
    text-decoration: none;
    cursor: default;
    transition: none;
  }

  .crt a:hover {
    color: inherit;
  }
  ```
- 理由:
  - グローバルの `a` スタイル（青色+hover）を維持しつつ、ターミナル内だけは `.crt` の色/グローを継承させる（差異7）。
  - mockではリンクが緑色で、見た目が通常テキストに馴染む（青くならない、hoverで変化しない）。

### 修正箇所4: placeholder 色（`@layer components` 内に追加）
- Before:（該当なし）
- After:
  ```css
  .crt input::placeholder {
    color: #4b5563;
    opacity: 1;
  }
  ```
- 理由:
  - mockの `::placeholder`（`#4b5563`）に合わせる（差異8）。
  - `.crt` にスコープして、他のページ/フォームに影響させない。

### 修正箇所5: ヒントテキスト用クラス（`@layer components` 内に追加）
- Before:（該当なし）
- After:
  ```css
  .hint-text {
    color: #6b7280;
    font-size: 12px;
    opacity: 0.7;
  }
  ```
- 理由:
  - mockの `.hint-text` と同等のスタイルで表示するため（差異3）。

---

## 修正ファイル: `src/components/terminal/Prompt.tsx`

### 修正箇所1: input の `placeholder` 追加（30–41行目付近）
- Before:
  ```tsx
  <input
    ref={inputRef}
    type="text"
    value={input}
    onChange={(e) => onInputChange(e.target.value)}
    onKeyDown={onKeyDown}
    className="flex-1 bg-transparent outline-none text-phosphor caret-transparent"
    spellCheck={false}
    autoComplete="off"
    autoCapitalize="off"
    autoCorrect="off"
  />
  ```
- After:
  ```tsx
  <input
    ref={inputRef}
    type="text"
    value={input}
    onChange={(e) => onInputChange(e.target.value)}
    onKeyDown={onKeyDown}
    placeholder="コマンドを入力... (help でコマンド一覧)"
    className="w-full bg-transparent outline-none text-phosphor caret-transparent"
    spellCheck={false}
    autoComplete="off"
    autoCapitalize="off"
    autoCorrect="off"
  />
  ```
- 理由:
  - mockの placeholder 文言を追加する（差異2）。
  - placeholder の色は `globals.css` の `.crt input::placeholder` で揃える（差異8）。

### 修正箇所2: ヒントテキストを入力欄の下に追加（返却JSXの構造変更）
- Before:
  ```tsx
  return (
    <div
      className="flex items-center gap-2 sticky bottom-0 bg-terminalBg px-4 py-2"
      onClick={handleContainerClick}
    >
      <span className="text-phosphor">$</span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={onKeyDown}
        className="flex-1 bg-transparent outline-none text-phosphor caret-transparent"
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
      />
      <Cursor />
    </div>
  );
  ```
- After:
  ```tsx
  return (
    <div
      className="sticky bottom-0 bg-terminalBg px-4 py-2"
      onClick={handleContainerClick}
    >
      <div className="flex items-center gap-2">
        <span className="text-phosphor">$</span>
        {/* 入力とカーソルは相対配置で重ねる（差異6） */}
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="コマンドを入力... (help でコマンド一覧)"
            className="w-full bg-transparent outline-none text-phosphor caret-transparent"
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
          />
          <span
            className="pointer-events-none absolute top-1/2 -translate-y-1/2"
            style={{ left: `${input.length}ch` }}
          >
            <Cursor />
          </span>
        </div>
      </div>

      <div className="mt-1">
        <span className="hint-text">
          💡 試してみるコマンド: whoami, skills, projects, github, help
        </span>
      </div>
    </div>
  );
  ```
- 理由:
  - mockと同様に、入力エリアの下へヒント文言を表示する（差異3）。
  - コンテナを `flex` から `sticky` + 内部 `flex` に分け、ヒントを下段に追加できる構造にする。

### 修正箇所3: カーソルを「入力文字の直後」に表示（差異6）
- Before:
  ```tsx
  <input
    ref={inputRef}
    type="text"
    value={input}
    onChange={(e) => onInputChange(e.target.value)}
    onKeyDown={onKeyDown}
    className="flex-1 bg-transparent outline-none text-phosphor caret-transparent"
    spellCheck={false}
    autoComplete="off"
    autoCapitalize="off"
    autoCorrect="off"
  />
  <Cursor />
  ```
- After:
  ```tsx
  <div className="relative flex-1">
    <input
      ref={inputRef}
      type="text"
      value={input}
      onChange={(e) => onInputChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder="コマンドを入力... (help でコマンド一覧)"
      className="w-full bg-transparent outline-none text-phosphor caret-transparent"
      spellCheck={false}
      autoComplete="off"
      autoCapitalize="off"
      autoCorrect="off"
    />
    <span
      className="pointer-events-none absolute top-1/2 -translate-y-1/2"
      style={{ left: `${input.length}ch` }}
    >
      <Cursor />
    </span>
  </div>
  ```
- 理由:
  - `flex-1` の input と `Cursor` の並びだと、カーソルが行の最右に寄るため。
  - input は幅100%のまま（placeholderも表示可能）維持しつつ、カーソルだけを文字数ベース（`ch`）で位置決めして、入力文字の直後へ追従させる。

---

## 修正ファイル: `src/components/terminal/Cursor.tsx`

### 修正箇所1: `ml-0.5` を削除（3行目）
- Before:
  ```tsx
  <span className="inline-block w-2 h-5 bg-phosphor animate-cursor ml-0.5" />
  ```
- After:
  ```tsx
  <span className="inline-block w-2 h-5 bg-phosphor animate-cursor" />
  ```
- 理由:
  - Prompt側で absolute 配置するため、Cursor自体に余計なマージンを持たせない（差異6）。

---

## 修正ファイル: `src/components/terminal/OutputBlock.tsx`

### 修正箇所1: リンクの見た目を `.crt` に委ねる（94行目付近）
- Before:
  ```tsx
  <a
    href={link.href}
    target={link.external ? "_blank" : undefined}
    rel={link.external ? "noopener noreferrer" : undefined}
    className="text-phosphor hover:text-phosphorDim underline transition-colors"
  >
    {link.label}
    {link.external && " ↗"}
  </a>
  ```
- After:
  ```tsx
  <a
    href={link.href}
    target={link.external ? "_blank" : undefined}
    rel={link.external ? "noopener noreferrer" : undefined}
  >
    {link.label}
    {link.external && " ↗"}
  </a>
  ```
- 理由:
  - ターミナル内リンクの見た目は `.crt a` で統一し、mock同様に「青リンク化/hover変化/強い装飾」を避ける（差異7）。
