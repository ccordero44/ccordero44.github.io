    async function Window_onLoad() {
         await myRequest();
        window.resizeTo(screen.availWidth / 1.5, screen.availHeight / 1.5);
        window.moveTo(screen.availWidth / 6, screen.availHeight / 5);
        document.getElementById("myForm").style.visibility = "hidden";
        document.getElementById("wholetable").style.display = "none";
        document.getElementById("dvTable").style.display = "none";

        var newTableObject = document.getElementById("myTable")
    
        if (!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
    }


