const createInitialItemLog = (agentInfo, itemInfo) => ({
  isExist: "False",
  tradeDate: "",
  startDate: "",
  endDate: "",
  lessorName: "",
  lessorPhone: "",
  lesseeName: "",
  lesseePhone: "",
  itemInfo: itemInfo || {}, // 전달된 itemInfo 사용
  agentInfo: agentInfo || {}, // 전달된 agentInfo 사용
  txID: "",
  Bank: {
    company: "",
    account: "",
    name: "",
  },
});

export default createInitialItemLog;
