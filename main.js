run();

function run() {
    chrome.storage.local.get(
        'masterSubject',
        function (masterSubjects) {
            let timetable = $('.koma');
            timetable.each(function () {
                let kamokuList = $(this).find('div');
                kamokuParse(kamokuList, masterSubjects);
                let kamokuSorted = kamokuList.sort(function (a, b) {
                    return ($(a).text() < $(b).text()) ? 1 : -1;
                });

                $(this).children().empty();
                $(this).children().append(kamokuSorted);

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

function kamokuParse(kamokuList, masterSubjects) {
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

function rollover(kamokuList) {
    const n = 5;
    if (kamokuList.length > n) {
        let hiddenKamoku = kamokuList.slice(n);
        let span = hiddenKamoku.parent();
        hiddenKamoku.remove();
        span.append($('<div></div>', {
            class: 'rolloverKamoku'
        }).append(hiddenKamoku).hide());
    }
}