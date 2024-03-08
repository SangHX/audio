import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Container, InputWrapper } from './style';
import { Button, Input } from 'antd';

const Home = () => {
  const [file1, setFile1] = useState<File>();
  const [file2, setFile2] = useState<File>();

  // Function to compare two audio files
  function compareAudioFiles(file1: File, file2: File): Promise<number> {
    return new Promise<number>((resolve) => {
      console.time();
      const context = new AudioContext();

      // Load the first audio file
      const file1Reader = new FileReader();
      file1Reader.onload = function (event: ProgressEvent<FileReader>) {
        const file1Data = event.target?.result as ArrayBuffer;
        context.decodeAudioData(file1Data, function (decodedData1) {
          // Load the second audio file
          const file2Reader = new FileReader();
          file2Reader.onload = function (event: ProgressEvent<FileReader>) {
            const file2Data = event.target?.result as ArrayBuffer;
            context.decodeAudioData(file2Data, function (decodedData2) {
              // Compare the audio data
              const bufferLength = Math.min(
                decodedData1.length,
                decodedData2.length
              );
              const channelData1 = decodedData1.getChannelData(0);
              const channelData2 = decodedData2.getChannelData(0);
              let diff = 0;
              for (let i = 0; i < bufferLength; i++) {
                diff += Math.abs(channelData1[i] - channelData2[i]);
              }
              const similarity = 1 - diff / bufferLength;
              resolve(similarity);
            });
          };
          file2Reader.readAsArrayBuffer(file2);
        });
      };
      file1Reader.readAsArrayBuffer(file1);
      console.timeEnd();
    });
  }

  const handleCompare = () => {
    if (file1 && file2) {
      compareAudioFiles(file1, file2)
        .then((similarity) => {
          const success = 1;
          if (similarity === success) {
            toast.success('The two audio files are identical');
          } else {
            toast.error('Two different audio files');
          }
          console.log('Similarity:', similarity);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };
  return (
    <Container>
      <InputWrapper>
        <Input
          type="file"
          id="audioInput"
          onChange={(e) => setFile1(e.target.files?.[0])}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          type="file"
          id="audioInput2"
          onChange={(e) => setFile2(e.target.files?.[0])}
        />
      </InputWrapper>
      <Button type="primary" size="large" onClick={handleCompare}>
        Compare
      </Button>
    </Container>
  );
};
Home.displayName = 'Home';
export default Home;
