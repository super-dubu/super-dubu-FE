const createInitialItemLog = (agentInfo) => {
  console.log("Received agentInfo:", agentInfo); // 전달된 agentInfo를 확인
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
      itemInfo: {
        tokenID: "",
        buildingName: "",
        hosu: "",
        buildingAddress: "",
        area: "",
        priceRental: "",
        priceMonthly: "",
        buildingType: "",
        itemType: "",
        floorInfo: "",
        availableDate: "",
        roomCount: "",
        confirmDate: "",
        parking: "",
        manageFee: "",
        body: "",
        itemID: "",
        status: "PENDING",
      },
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
