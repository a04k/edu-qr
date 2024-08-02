## Running the Dev Environment

---

(for PC): run the development server: 

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

 To use the app on a mobile device you need to have https otherwise you will not be able to use the camera

use mkcert to be able to create certificates

```bash
# Windows
choco install mkcert 
# Mac
brew install mkcert
```

then run the app (development)

```bash
bun dev --experimental-https
# or
npm run dev --experimental-https
```

you can find your PC/Host's Local IPV4 Address by using:
```bash
ipconfig
```

Open [https://hostAddress:3000](https://localhost:3000) with your browser to see the result