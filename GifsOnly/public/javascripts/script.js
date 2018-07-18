$(function () {

  console.log("IronGenerator JS imported successfully!");
  $(".clickable").click(function () {
    const imgSrc = $(this).children()[0].currentSrc;
    //console.log($(this).children())
    $("#searchForm").hide();
    let newDiv = $("<div>").addClass("moodClassWow");
    let textDiv = $("<div>")
      .addClass("textClass")
      .html("New Mood");
    let cambiarDiv = $("<button>")
      .addClass("buttonCambio")
      .html("Change");
    let updateMood = $('<button>')
      .addClass('buttonUpdate')
      .html("Update");
    let img = $("<img>").attr("src", imgSrc);
    axios.post("http://localhost:3000/moodWow", { imgSrc }).then(res => {
      return res;
    });
    $(".clear").empty();
    newDiv.append(img);
    newDiv.append(cambiarDiv);
    newDiv.append(updateMood);
    $("body").append(textDiv);
    $("body").append(newDiv);
  });

  $("body").on("click", ".buttonCambio", function () {
    $("#searchForm").show();
    $(".textClass").empty();
    $(".moodClassWow").empty();
  });

  $("body").on("click", ".buttonUpdate", function (){
    window.location.reload();
  });

  let sendtext = () =>{
    var textSent = $('.message-form__input').val();
    if(textSent=='' || $('.message-form__input').length == 0){
      return
    }
    var textSentDomFake = $('.message-form__input').val()+' by '+ $('#hideAuthorIdUserName').text();
    axios.post('http://localhost:3000/chatRoom',{textSent}).then(res=>{
      console.log('text successfully sent to the back')
    })
    let messageDom = $('<p>').addClass('message');
    messageDom.text(textSentDomFake);
    messageDom.append('<br>');
    let reactLink = $('<a>').attr('href', '').addClass('messageReactButton').text("react");
    let deleteLink = $('<a>').attr('href', '').addClass('messageDeleteButton').text("delete");
    messageDom.append(reactLink);
    reactLink.after('&nbsp;&nbsp');
    messageDom.append(deleteLink);
    $(".messages").append(messageDom);
    $('input[type="text"]').val('')
  }

  $('.message-form__button').click(function () {
    sendtext();
  });

  $(document).keypress(function(e) {
    if(e.which == 13) {
        sendtext();
    }
});


  $('.chatClickable').click(function () {
    const imgSrc = $(this).children()[0].currentSrc;
    axios.post("http://localhost:3000/chatRoomGifMessage", { imgSrc }).then(res => {
      return res;
    })
    let gifDom = $('<div>').addClass('gifMessage');
    let gifContentDom = $('<div>').addClass('gifMessageContent');
    let gif = $('<img>').attr('src', imgSrc);
    let authorText= 'by '+ $('#hideAuthorIdUserName').text();
    let reactLink = $('<a>').attr('href', '').addClass('messageReactButton').text("react");
    let deleteLink = $('<a>').attr('href', '').addClass('messageDeleteButton').text("delete");
    gifContentDom.append(gif);
    gifContentDom.append(' by '+ $('#hideAuthorIdUserName').text());
    gifDom.append(gifContentDom);
    gifDom.append(reactLink);
    reactLink.after('&nbsp;&nbsp');
    gifDom.append(deleteLink);
    $(".messages").append(gifDom);
  })
});
