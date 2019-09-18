$(function(){
  // ajaxで帰ってきた値からHTMLを生成する関数
  function buildHTML(message) {

    var image = (message.image.url) ? `<img class="message__lower__image" src="${ message.image.url }" >` : "";
    //HTMLを生成
      var html = `<div class="message" data-message-id="${ message.id }">
                    <div class="message__upper">
                      <p class="message__upper__user-name">
                        ${message.user_name}
                      </p>
                      <p class="message__upper__date">
                        ${message.created_at}
                      </p>
                    </div>
                      <div class="message__lower">
                        <p class="message__lower__text">
                          ${message.content}
                        </p>
                          ${image}
                      </div>
                  </div>`
    return html
  }

  //投稿後に最新の投稿までスクロールする関数
  function scrollBottom(){
    var target = $('.message').last();
    var position = target.offset().top + $('.messages').scrollTop();
    $('.messages').animate({
      scrollTop: position
    }, 300, 'swing');
  }

  //フォームが送信されたら
  $('#js-form').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    // 送信するデータを生成する
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    // 通信がせいこうしたゾ
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#js-form')[0].reset();
      scrollBottom();
    })
    // 通信が失敗したゾ
    .fail(function(){
      alert('error');
    })
    //送信ボタンが押せなくなるのを直す
    .always(function(data){
      $('#js-submit').prop('disabled', false);
    })
  })

  var reloadMessages = function() {
    //今いるページが/groups/グループID/messagesとマッチすれば実行する
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      last_message_id = $('.message:last').data('message-id');
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
        });
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        alert('通信が失敗しました');
      });
    }
  };


  setInterval(reloadMessages, 5000);
});