$(function(){
  // ajaxで帰ってきた値からHTMLを生成する関数
  function buildHTML(message) {
    //メッセージ文があるか？
    var content = message.content ? `${ message.content }` : "";
    //画像があるか？
    var img = message.image ? `<img class="message__lower__text" src="${ message.image }" >` : "";
    //HTMLを生成
    var html = `<div class="message">
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
                        ${content}
                      </p>
                    <img class="message__lower__image" ${img}
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
})