---
id: comparing-components
title: Comparing Components (diff)
---

### Compare all modified components to their latest release or Snap

```bash
$ bit diff

-----------------------------------
showing diff for ui/button
-----------------------------------
--- button.tsx (0.0.2 original)
+++ button.tsx (0.0.2 modified)
@@ -8,5 +8,5 @@ export type ButtonProps = {
 };

 export function Button({ text }: ButtonProps) {
-  return <div>{text}</div>;
+  return <div className="button">{text}</div>;
 }
```

### Compare the specified modified components to their latest release or Snap

```bash
bit diff [ids...]
```

### Compare a modified component to a specific version of it

```bash
bit diff [id] [version]
```

### Compare a release version to another release version

```bash
bit diff [id] [version] [to_version]
```

:::info use glob patterns
You can use a pattern for multiple ids, such as bit diff "utils/\*". (wrap the pattern with quotes to avoid collision with shell commands)
:::
