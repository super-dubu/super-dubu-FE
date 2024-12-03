const string = import.meta.env.VITE_CUSTOM_KEY;

const createInitialItemLog = (agentInfo, itemInfo) => ({
  isExist: "False",
  tradeDate: "",
  startDate: "",
  endDate: "",
  itemInfo: itemInfo || {}, // 전달된 itemInfo 사용
  agentInfo: agentInfo || {}, // 전달된 agentInfo 사용
  txID: string,
});

export default createInitialItemLog;
