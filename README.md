<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" width="250" alt="Nest Logo" /></a>
  <a href="https://blog.steinjun.net/" target="blank"><img src="https://blog.steinjun.net/_next/image?url=https%3A%2F%2Fapi.blog.steinjun.net%2Ffile%2Fpost%2F1%2Fthumbnail&w=828&q=75" width="250" alt="Nest Logo" /></a>
</p>

# NextJS for **blog.steinjun.net**
[blog.steinjun.net](https://blog.steinjun.net) use NextJS for frontend.  
This is 2nd version of blog and first real serviceable blog.  

# Feature
Below features are available with this blog
## 1. Upload Post  
  + Post has a Title, subtitle, description, thumbnail, tags, and body.  

  + Post body is managed by MarkDown and uses [react-md-editor](https://github.com/uiwjs/react-md-editor) for editor.  

  + Upload an image to server from editor by paste.  
## 2. List Posts  
  + In ['/'(main)](https://blog.steinjun.net/) page  
  Shows recommends, regulars, recents.  

  + In ['/post'](https://blog.steinjun.net/) page  
  shows all posts in order of recent with Infinity-scroll way.
## 3. Login  
  + Use OAuth login(kakao) for admin authorization(writing and editing permission).  
## 4. Responsive for all size of display
  + All pages are properly look as responsive design.
## 5. Specials 🪄
  + ✅ [/profile](https://blog.steinjun.net/profile) page.  
  (Only mobile works) Snyc the profile card with gyroscope of mobile device.  
  🥚🐰 There is easter egg to reaching this page!  

  + ✅ [/post/10(Baekjoon)](https://blog.steinjun.net/post/10) page.  
  It shows baekjoon ranking in real-time.  

  + 🚧 [/village/square](https://blog.steinjun.net/village/square) page  
  offers virtual space with real-time chating and character moving. Up to 5 people can access this service.