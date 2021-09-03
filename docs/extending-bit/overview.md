---
id: overview
title: Overview
---

Bit is entirely built from Aspects. Every Aspect is like an API-first `Feature`, which exposes an programmatic API to all other Aspects and uses their API in order to extend them.

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
