function eventData(id) {
    let requestObject = new XMLHttpRequest();
    requestObject.open("GET", `https://projects.deelesisuanu.com/elliot-events/eventData?eid=${id}`);
    requestObject.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if(this.responseText == "[]" || this.responseText == "[][]"){
                return;
            }
            const responseData = JSON.parse(this.responseText);
            let output = "";
            var i = 1;
            for (const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                    const element = responseData[key];
                    $("#eventTitle").html(element.name);
                    $("#eventdesc").html(element.description);
                    $("#eventDateTime").html(element.dateTime);
                    $("#eventImg").attr("src", element.icon);
                    $("#rowMainer").show();
                }
            }
            $("#rowSpinner").hide();
        }
    };
    requestObject.send();
}

$(document).ready(function () {
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get('eid');
    eventData(eventId);
});