import React, { ChangeEvent, useState } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { testState1, testState2 } from "../state/atom";
import styled from "styled-components";

const TestPage = () => {
  const [username, setUsername] = useState("");

  // USESTATE와 유사 : READ, WRITE 가능
  const [test1, setTest1] = useRecoilState(testState1);
  // READ ONLY
  const test2 = useRecoilValue(testState2);
  // WRITE ONLY
  const setTest2 = useSetRecoilState(testState2);
  // RESET
  const resetTest1 = useResetRecoilState(testState1);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleClick = (target: "test1" | "test2") => {
    if (target === "test1") {
      setTest1((prev) => ({ ...prev, inProgress: !prev.inProgress }));
    } else {
      setTest2((prev) => ({ ...prev, inProgress: !prev.inProgress }));
    }
  };

  const handleConfirm = () => {
    setTest1((prev) => ({ ...prev, user: username }));
  };

  return (
    <Stcontainer>
      <div>
        <h2>RECOIL TEST 01</h2>
        <div>
          <span>USERNAME : {test1.user}</span>
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => handleChange(e)}
            />
            <button onClick={() => handleConfirm()}>CONFIRM</button>
          </div>
          <div>
            <span>INPROGRESS : {`${test1.inProgress}`}</span>
            <button onClick={() => handleClick("test1")}>
              CHANGE PROGRESS
            </button>
          </div>
          <button onClick={() => resetTest1()}>RESET</button>
        </div>
      </div>
      <div>
        <h2>RECOIL TEST 02</h2>
        <div>
          <span>USERNAME : {test2.user}</span>
          <div>
            <span>INPROGRESS : {`${test2.inProgress}`}</span>
            <button onClick={() => handleClick("test2")}>
              CHANGE PROGRESS
            </button>
          </div>
        </div>
      </div>
    </Stcontainer>
  );
};

export default TestPage;

const Stcontainer = styled.div`
  h2 {
    margin: 16px 0;
  }

  button {
    border: 1px solid #000000;
    padding: 4px;
    margin-left: 8px;
  }
`;
