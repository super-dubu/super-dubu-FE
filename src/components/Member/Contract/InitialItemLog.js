const createInitialItemLog = (agentInfo, itemInfo) => {
  // console.log("Received agentInfo:", agentInfo); // 전달된 agentInfo를 확인
  return [
    {
      isExist: "False",
      tradeDate: "",
      startDate: "",
      endDate: "",
      lessorName: "",
      lessorPhone: "",
      lesseeName: "",
      lesseePhone: "",
      itemInfo: itemInfo || {},
      agentInfo: agentInfo || {}, // agentInfo를 동적으로 설정
      txID: "",
      Bank: {
        company: "",
        account: "",
        name: "",
      },
    },
  ];
};

export default createInitialItemLog;
