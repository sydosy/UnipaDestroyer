run();

function run() {
    //時間割画面用
    chrome.storage.local.get(
        'masterSubject',
        function (masterSubjects) {
            let timetable = $('.koma');
            timetable.each(function () {
                let subjectList = $(this).find('div');
                subjectParse(subjectList, masterSubjects);

                let subjectListSorted = subjectList.sort(function (a, b) {
                    return ($(a).text() < $(b).text()) ? 1 : -1;
                });
                //ソートしたのでhtmlの更新
                $(this).children().empty();
                $(this).children().append(subjectListSorted);

                hideSubject(subjectList);
            });

            let hiddenLectures = $('.rolloverSubject').parent().parent().parent();
            //1限、2限などのセルを2行分に変更
            hiddenLectures.find('.jigen').each(function () {
                $(this).attr('rowSpan', 2);
            });
            //rollover用のボタン生成
            hiddenLectures.after($('<tr></tr>').append($('<td></td>', {
                colSpan: '6'
            }).append($('<button></button>', {
                class: 'rollButton',
                type: 'button',
                text: '▼'
            }))));

            rollover();
        }
    );

    //履修結果取得用
    let subject = $('.tdKamokuList');
    let gradePoint = $('.tdHyokaList');
    let chromeStorage = {};
    let masterSubjectArray = [];

    for (let i = 0; i < gradePoint.length; i++) {
        if (!(gradePoint[i].innerText === 'D' || gradePoint[i].innerText === '' || gradePoint[i].innerText === '-')) {
            masterSubjectArray.push(subject[i].innerText);
        }
    }

    if (masterSubjectArray.length !== 0) {
        chromeStorage['masterSubject'] = masterSubjectArray;
        chrome.storage.local.set(chromeStorage, function () {
            console.log('save!')
        });
    }
}

function subjectParse(kamokuList, masterSubjects) {
    kamokuList.each(function () {
        let kamoku = $(this).attr('class') === 'linkMark' ? $(this).find('a') : $(this);
        let tmp = kamoku.text().replace(/　/g, '');
        const nbsp = String.fromCharCode(160);
        tmp = tmp.replace(nbsp, ' ');
        let subject = tmp.split(' ');
        if (masterSubjects.masterSubject.indexOf(subject[1]) >= 0) {
            kamoku.text('Destroy');
            kamoku.attr('title', subject[1]);
        } else {
            kamoku.text(subject[1] + subject[2] + subject[3]);
        }
    });
}

function hideSubject(subjectList) {
    //表示する科目数
    const n = 5;

    if (subjectList.length > n) {
        let hiddenSubject = subjectList.slice(n);
        let span = hiddenSubject.parent();
        hiddenSubject.remove();
        span.append($('<div></div>', {
            class: 'rolloverSubject'
        }).append(hiddenSubject).hide());
    }
}

function rollover() {
    $('.rollButton').on('click', function () {
        $(this).parent().parent().prev('tr').find('.rolloverSubject').toggle();
    });
}