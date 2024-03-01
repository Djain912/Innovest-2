// import { StreamChat, User } from 'stream-chat';
// import {
//   Chat,
//   Channel,
//   ChannelHeader,
//   MessageInput,
//   MessageList,
//   Thread,
//   Window,
// } from 'stream-chat-react';

// import 'stream-chat-react/dist/css/v2/index.css';

// const userId = 'old-fog-2';
// const userName = 'old-fog-2';

// const user: User = {
//   id: userId,
//   name: userName,
//   image: `https://getstream.io/random_png/?id=${userId}&name=${userName}`,
// };

// const apiKey = 'tsavq7qu26xg';
// const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoib2xkLWZvZy0yIn0.p6XS6xzoeZ0FTIUB0a_jj4m0unVl3UYALb6gSzSMYho';

// const chatClient = new StreamChat(apiKey);
// chatClient.connectUser(user, userToken);

// const channel = chatClient.channel('messaging', 'custom_channel_id', {
//   // add as many custom fields as you'd like
//   image: 'https://www.drupal.org/files/project-images/react.png',
//   name: 'Talk about React',
//   members: [userId],
// });



// function Chatpage() {
//     return (
//        <Chat client={chatClient} theme='str-chat__theme-light'>
//     <Channel channel={channel}>
//       <Window>
//         <ChannelHeader />
//         <MessageList />
//         <MessageInput />
//       </Window>
//       <Thread />
//     </Channel>
//   </Chat>
//     );
// }

// export default Chatpage;