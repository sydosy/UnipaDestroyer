run();
function run(){
    var kamoku = document.getElementsByClassName("tdKamokuList");
    var hyouka = document.getElementsByClassName("tdHyokaList");
    var risyuu = document.getElementsByClassName("linkMark");
    var chromeStorage = {};
    var masterSubjectArray = [];

    chrome.storage.local.get(
        "masterSubject",
        function (masterSubjects) {
            for(var i = 0; i < risyuu.length; i++) {
                var tmp = risyuu[i].innerText.replace(/　/g,"");
                var nbsp = String.fromCharCode( 160 );
                tmp = tmp.replace(nbsp," ");
                var subject = tmp.split(" ");
                if(masterSubjects.masterSubject.indexOf(subject[1]) >= 0){
                    risyuu[i].innerText = "Destroy";
                }
            }
        }
    );

    for(var i = 0; i < hyouka.length; i++) {
        if(!(hyouka[i].innerText === "D" || hyouka[i].innerText === "" || hyouka[i].innerText === "-")){
            masterSubjectArray.push(kamoku[i].innerText);
        }
    }

    if (masterSubjectArray.length !== 0) {
        chromeStorage["masterSubject"] = masterSubjectArray;
        chrome.storage.local.set(chromeStorage, function () {
            console.log("save!")
        });
    }
}