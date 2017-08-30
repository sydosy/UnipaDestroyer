run();

function run() {
    chrome.storage.local.get(
        'masterSubject',
        function (masterSubjects) {
            let timetable = $('.koma');
            timetable.each(function () {
                let kamoku = $(this).find('a');
                kamoku.each(function (i, risyuu) {
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
                let result = kamoku.sort(function (a, b) {
                    return ($(a).text() < $(b).text())?1:-1;
                });
                kamoku.parent().each(function (i) {
                    $(this).empty();
                    $(this).append(result[i]);
                })
            });
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