---
id: try-bit
title: Try Bit
---

import { Image } from '@site/src/components/image'

Here you can find a demo project that will let you explore around a fully functional Bit workspace. You can [view the project on GitHub here](https://github.com/teambit/try-bit), and play with the tech-jokes widget to enjoy fine humor by opening the Bit workspace UI and then heading over to the "tech-jokes-viewer" component's compositions tab.

#### Want to do it yourself? Try the [getting started tutorial ->](https://harmony-docs.bit.dev/tutorial/install-bit)

### Clone the project and explore the workspace

Clone a full Bit workspace and explore it yourself:

1. [Install Bit Harmony](https://harmony-docs.bit.dev/getting-started/installing-bit)

2. Clone this demo workspace repo

```bash
git clone https://github.com/teambit/try-bit.git try-bit
```

3. Go to the workspace directory

```
cd try-bit
```

4. Install all workspace dependencies (that will also import all components and link them to your `node_module` directory)

```bash
bit install
```

5. Run the development server

```bash
bit start
```

6. Go to `https://localhost:3000` to see the Workspace UI

<Image src="/img/tech_jokes.png" />

<br />

- All components in this workspace have been exported to [https://bit.dev/our-org/tech-jokes](https://bit.dev/our-org/tech-jokes).
