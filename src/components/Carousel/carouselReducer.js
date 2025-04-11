const carouselReducer = (state, action) => {
  switch (action.type) {
    case 'PROGRESS':
    case 'NEXT':
      return {
        ...state,
        isPlaying: action.type === 'PROGRESS',
        currentIndex: (state.currentIndex + 1) % action.length,
      };
    case 'PAUSE':
      return {
        ...state,
        isPlaying: false,
      };
    case 'PLAY':
      return {
        ...state,
        isPlaying: true,
      };
    case 'PREV':
      return {
        ...state,
        takeFocus: true,
        currentIndex: (state.currentIndex - 1 + action.length) % action.length,
        isPlaying: false,
      };
    case 'GOTO':
      return {
        ...state,
        takeFocus: true,
        currentIndex: action.index,
      };
    case 'UNSET_FOCUS':
      return {
        ...state,
        takeFocus: false,
      };
    default:
      return state;
  }
};

export default carouselReducer;
