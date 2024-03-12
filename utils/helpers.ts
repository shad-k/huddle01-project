// generate random number between min and max
export const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const createMockParticipants = (count: number = 10) => {
  const participants = [];
  for (let i = 0; i < count; i++) {
    const priority = Math.ceil(random(0, 3));
    const isAudioOrVideo = priority > 1 ? random(0, 1) : false;
    participants.push({
      id: i,
      name: `User ${i}`,
      audio: priority > 2 ? true : !!isAudioOrVideo && isAudioOrVideo > 0.5,
      video: priority > 2 ? true : !!isAudioOrVideo && isAudioOrVideo <= 0.5,
    });
  }
  return participants;
};
