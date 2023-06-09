import { useState } from 'react';
import './App.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';

const API_KEY = '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';
const systemMessage = {
  role: 'system',
  content: 'Explain all concepts like I am a patient. You are doctor',
};

function Chatbot() {
  //메세지들을 담을 state
  const [messages, setMessages] = useState([
    {
      message: '안녕하세요 무엇을 도와드릴까요?',
      sender: 'ChatGPT',
    },
  ]);

  //응답 생성중을 나타낼 state
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    // 입력된 메세지로 객체생성
    const newMsg = {
      message,
      direction: 'outgoing', // 현재 메세지 처리중임을 설정
      sender: 'user',
    };

    // 새로운 메세지를 메세지 목록에 추가
    const newMessages = [...messages, newMsg];
    setMessages(newMessages);

    //작성중으로 상태 변경
    setIsTyping(true);

    //메세지들을 gpt응답으로 처리
    await processMessageToChatGPT(newMessages);
  };

  //챗 지피티의 응답을 다루는 함수
  async function processMessageToChatGPT(chatMessages) {
    //chatMessage{sender :"user" 또는 "chatGPT", message="내용"} 형식으로 저장할 예정
    // apiMessages {role: "user" or "assistant", content: "내용"} 형식으로 데이터를 받아옴
    let apiMsgs = chatMessages.map((messageObj) => {
      let role = '';

      //메세지 작성자 역할 구분

      //Chat GPT라면 assistant로
      if (messageObj.sender === 'ChatGPT') {
        role = 'assistant';
      }
      //사용자의 메세지라면 user으로
      else {
        role = 'user';
      }

      return { role: role, content: messageObj.message };
    });

    //GPT모델 선언
    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [
        systemMessage, //말투 지정
        ...apiMsgs, //메세지 배열임
      ],
    };
    //role
    //user :사용자가 작성했음
    //assistant: gpt가 장성했음
    //system : gpt말하는 방식 명령

    await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log('데이터 입니다');
        console.log(data.choices[0].content);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: 'ChatGPT',
          },
        ]);

        //응답 생성 완료로 띄움
        setIsTyping(false);
      });
  }

  return (
    <div>
      <div
        style={{
          position: 'relative',
          height: '600px',
          width: '700px',
          margin: '1rem 1rem',

          //   backgroundColor: "black !important",
        }}
      >
        <MainContainer>
          {/* 채팅창을 띄울 컴포넌트 */}
          <ChatContainer>
            {/* 모든 메세지 목록을 띄울 컴포넌트 */}
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="정답을 작성중이니 조금만 기다려주세요"></TypingIndicator>
                ) : null
              }
            >
              {/* 메세지 객체를 map형식으로 반복문 */}
              {messages.map((message, i) => {
                console.log(message);
                return <Message key={i} model={message}></Message>;
              })}
            </MessageList>

            {/* //사용자의 입력을 받을 컴포넌트 */}
            <MessageInput
              placeholeder="궁금한 것을 물어보세요"
              onSend={handleSend}
            ></MessageInput>
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default Chatbot;
