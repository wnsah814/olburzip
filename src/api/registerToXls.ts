import Excel from "exceljs";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { dbService } from "./fbase";

const applyToXlsx = async () => {
  const year_input = prompt("다운받을 명부의 년도를 입력해주세요", new Date().getFullYear().toString());
  if (year_input === null) {
    alert("년도를 입력해주세요");
    return;
  }
  if (isNaN(parseInt(year_input))) {
    alert("2023과 같이 입력해주세요");
    return;
  } else {
    alert(`${year_input}년 명부를 다운로드하겠습니다`);
  }
  try {
    const workbook = new Excel.Workbook();
    workbook.creator = "URBUR";
    workbook.lastModifiedBy = "URBUR";
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.addWorksheet(`${year_input}-1 어리버리 명부`);
    workbook.addWorksheet(`${year_input}-2 어리버리 명부`);
    const sheetOne = workbook.getWorksheet(`${year_input}-1 어리버리 명부`);
    const sheetTwo = workbook.getWorksheet(`${year_input}-2 어리버리 명부`);

    sheetOne.columns = [
      { header: "이름", key: "name", width: 10 },
      { header: "학번", key: "studentId", width: 20 },
      { header: "연락처", key: "phoneNumber", width: 20 },
      { header: "회비납부", key: "paid", width: 10 },
    ];
    sheetTwo.columns = [
      { header: "이름", key: "name", width: 10 },
      { header: "학번", key: "studentId", width: 20 },
      { header: "연락처", key: "phoneNumber", width: 20 },
      { header: "회비납부", key: "paid", width: 10 },
    ];
    const q1 = query(
      collection(dbService, "members"),
      where("semester", "==", "1"),
      orderBy("name", "asc")
    );
    const memberData1 = await getDocs(q1);
    const arr1 = memberData1.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    arr1.map((item, index) => {
      sheetOne.addRow(item);
    });

    const q2 = query(
      collection(dbService, "members"),
      where("semester", "==", "2"),
      orderBy("name", "asc")
    );
    const memberData2 = await getDocs(q2);
    const arr2 = memberData2.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    arr2.map((item, index) => {
      sheetTwo.addRow(item);
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${year_input}_어리버리_명부.xlsx`;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  } catch (error) {
    console.error(error);
  }
};
export default applyToXlsx;
