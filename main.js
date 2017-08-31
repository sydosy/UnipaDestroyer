run();

function run() {
    chrome.storage.local.get(
        'masterSubject',
        function (masterSubjects) {
            let timetable = $('.koma');
            timetable.each(function () {
                let kamokuList = $(this).find('a');
                kamokuList.each(function (i, risyuu) {
                    let tmp = risyuu.innerText.replace(/　/g, '');
                    const nbsp = String.fromCharCode(160);
                    tmp = tmp.replace(nbsp, ' ');
                    let subject = tmp.split(' ');
                    if (masterSubjects.masterSubject.indexOf(subject[1]) >= 0) {
                        risyuu.innerText = 'Destroy';
                        risyuu.title = subject[1];
                    } else {
                        risyuu.innerText = subject[1] + subject[2];
                    }
                });
                let kamokuSorted = kamokuList.sort(function (a, b) {
                    return ($(a).text() < $(b).text()) ? 1 : -1;
                });
                kamokuList.parent().each(function (i) {
                    $(this).empty();
                    $(this).append(kamokuSorted[i]);
                });
                rollover(kamokuList);
            });

            //1限、2限などのセルを2行分に変更
            $('.jigen').each(function () {
                $(this).attr("rowSpan", 2);
            });
            //rollover用のボタン生成
            $('.tujoHeight').after($('<tr></tr>').append($('<td></td>', {
                colSpan: '6'
            }).append($('<button></button>', {
                class: 'roll-button',
                type: 'button',
                text: '▼'
            }))));

            let trigger = $('.roll-button');
            $(trigger).on('click', function () {
                $(this).parent().parent().prev('tr').find('.rolloverKamoku').toggle();
            })
        }
    );

    //以下、履修結果取得用
    let kamoku = $('.tdKamokuList');
    let hyouka = $('.tdHyokaList');
    let chromeStorage = {};
    let masterSubjectArray = [];

    for (let i = 0; i < hyouka.length; i++) {
        if (!(hyouka[i].innerText === 'D' || hyouka[i].innerText === '' || hyouka[i].innerText === '-')) {
            masterSubjectArray.push(kamoku[i].innerText);
        }
    }

    if (masterSubjectArray.length !== 0) {
        chromeStorage['masterSubject'] = masterSubjectArray;
        chrome.storage.local.set(chromeStorage, function () {
            console.log('save!')
        });
    }
}

function rollover(kamokuList) {
    const n = 5;
    if (kamokuList.length > n) {
        let hiddenKamoku = kamokuList.slice(n);
        let linkMarks = hiddenKamoku.parent();
        let span = linkMarks.parent();
        linkMarks.remove();
        span.append($('<div></div>', {
            class: 'rolloverKamoku'
        }).append(linkMarks).hide());
    }
}