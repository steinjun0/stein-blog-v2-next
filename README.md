<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" width="250" alt="Nest Logo" /></a>
  <a href="https://blog.steinjun.net/" target="blank"><img src="https://blog.steinjun.net/_next/image?url=https%3A%2F%2Fapi.blog.steinjun.net%2Ffile%2Fpost%2F1%2Fthumbnail&w=828&q=75" width="250" alt="Nest Logo" /></a>
</p>

# NextJS for blog.steinjun.net
This is a personal project where I document my development experiences and personal studies using Nextjs, Typescript, MUI, StyledComponent(MUI), tailwind, Nextjs, MySQL, Docker(compose), letsencrypt, and nginx. We are currently changing the project structure.

# Technologies Used
- NextJS
- Typescript
- Material-UI (MUI)
- Styled Components (MUI)

# Features
Below are the features of this blog:

### 1. Upload Post  
Upload posts that contain a title, subtitle, description, thumbnail, tags, and body. The post body is managed by MarkDown and uses the react-md-editor for editing. Additionally, users can upload images to the server directly from the editor by pasting.

### 2. Post List
The blog includes a main page that shows recommendations, regulars, and recents posts. Additionally, users can access a page that lists all posts in the order of the most recent ones. The post list is implemented using infinity-scroll.

### 3. Login  
  Use OAuth login (kakao) for admin authorization (writing and editing permission).  

### 4. Responsive for all sizes of display
All pages have responsive design.

### 5. Specials 🪄
The blog includes some unique functionalities that are not commonly found in blogs, such as:
  - ✅ [/profile](https://blog.steinjun.net/profile) page.  
  (Only mobile works) Sync the profile card with the gyroscope of the mobile device.  
  🥚🐰 There is an Easter egg to reaching this page!  
  - ✅ [/post/10(Baekjoon)](https://blog.steinjun.net/post/10) page.  
  It shows Baekjoon ranking in real-time.  
  - 🚧 [/village/square](https://blog.steinjun.net/village/square) page offers virtual space with real-time chatting and character moving. Up to 5 people can access this service.

Thank you for checking out my blog!