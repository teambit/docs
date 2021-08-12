---
id: overview
title: Overview
---

Bit is entirely built from Aspects.

## Aspect Anatomy

### API
The Aspect API is the provider return value. It can be from any type.

```tsx
class MyAspect {
  async provider() {
    /**
     * API method for my aspect.
    **/
    getMyData() {

    }

    return new MyAspect();
  }
}
```

### Provider (Constructor)

### Dependencies

### Config
