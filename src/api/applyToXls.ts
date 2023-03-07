import Excel, { Border } from "exceljs";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { dbService } from "./fbase";

const applyToXlsx = async () => {
    try {
        // 엑셀 생성
        const workbook = new Excel.Workbook();

        // 생성자
        workbook.creator = "URBUR";

        // 최종 수정자
        workbook.lastModifiedBy = "URBUR";

        // 생성일(현재 일자로 처리)
        workbook.created = new Date();

        // 수정일(현재 일자로 처리)
        workbook.modified = new Date();

        // addWorksheet() 함수를 사용하여 엑셀 시트를 추가한다.
        // 엑셀 시트는 순차적으로 생성된다.
        workbook.addWorksheet("2023 지원 현황");

        // 엑셀 시트를 접근하는 방법은 세 가지 방법이 존재한다.
        // 1. getWorksheet() 함수에서 시트 명칭 전달
        const sheetOne = workbook.getWorksheet("2023 지원 현황");

        // 2. getWorksheet() 함수에서 시트 인덱스 전달
        // const sheetTwo = workbook.getWorksheet(1);

        // 3. 대괄호 표기법
        // const sheetThree = workbook.worksheets[2];

        // removeWorksheet() 함수를 사용하여 엑셀 시트를 제거한다.
        // workbook.removeWorksheet(sheetThree.id);

        // 컬럼 설정
        // header: 엑셀에 표기되는 이름
        // key: 컬럼을 접근하기 위한 key
        // hidden: 숨김 여부
        // width: 컬럼 넓이
        sheetOne.columns = [
            { header: "이름", key: "name", width: 10 },
            { header: "학번", key: "studentId", hidden: false, width: 20 },
            { header: "연락처", key: "phoneNumber", width: 20 },
            { header: "MBTI", key: "mbti", width: 20 },
            { header: "자기소개", key: "introduce", width: 60 },
            // {
            //     header: "부서명",
            //     key: "deptName",
            //     width: 100,
            //     // 스타일 설정
            //     style: {
            //         // Font 설정
            //         font: { name: "Arial Black", size: 20 },
            //         // Borders 설정
            //         border: {
            //             top: { style: "thin", color: { argb: "FF00FF00" } },
            //             left: { style: "thin", color: { argb: "FF00FF00" } },
            //             bottom: { style: "thin", color: { argb: "FF00FF00" } },
            //             right: { style: "thin", color: { argb: "FF00FF00" } },
            //         },
            //         // Fills 설정
            //         fill: {
            //             type: "pattern",
            //             fgColor: { argb: "FFFFFF00" },
            //             bgColor: { argb: "FF0000FF" },
            //         },
            //     },
            // },
        ];
        const q = query(
            collection(dbService, "2023applied"),
            orderBy("createdAt", "desc")
        );
        const appliedData = await getDocs(q);
        const arr = appliedData.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log(arr);

        const borderStyle = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
        };

        arr.map((item, index) => {
            sheetOne.addRow(item);

            // 추가된 행의 컬럼 설정(헤더와 style이 다를 경우)
            // for (let loop = 1; loop <= 4; loop++) {
            // const col = sheetOne.getRow(index + 2).getCell(loop);
            // col.border = borderStyle;
            // col.font = { name: "Arial Black", size: 11 };
            // }
        });

        workbook.xlsx.writeBuffer().then((data) => {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = `2023_어리버리_지원목록.xlsx`;
            anchor.click();
            window.URL.revokeObjectURL(url);
        });
    } catch (error) {
        console.error(error);
    }
};
export default applyToXlsx;
