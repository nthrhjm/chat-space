$(function() {
  // 入力したメンバー名を表示するDOMを取得する
  var search_list = $('#user-search-result');
  var group_list = $('#js-chat-member');
  //ajaxで帰ってきた正しい値からHTMLを生成する関数
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
  }

  //ajaxで帰ってきた値が空の場合のHTMLを生成する関数
  function appendErrorMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    search_list.append(html);
  };



  // 検索フォームに入力があったら
  $('#user-search-field').on('keyup', function(e) {
    e.preventDefault();
    var target = $(this).val();
    var url = '/users/search'
 

  // 送信するデータを生成する
    $.ajax( {
      url: url,
      type: 'GET',
      data: {keyword:  target},
      dataType: 'json'
    })

    //非同期通信で期待するデータが帰ってきた
    .done(function(users) {
      // 以前の検索結果を消すempty()
      $("#js-chat-member").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        })
      } else {
        // 検索したユーザー名がない場合
        appendErrorMsgToHTML("一致するユーザーはいません");
      }
   })
    // エラーが帰ってきた
    .fail(function(){
      alert('error');
    })
    // 送信ボタンが押せなくなるのを直す
    .always(function(users){
      $('#js-submit').prop('disabled', false);
    })
  })


  // 追加ボタンを押すと
  $(document).on('click', '.chat-group-user__btn--add', function(){
    // console.log('発火！！！');

    // 追加したメンバーの名前とidを取得してオブジェクトにする
    var userName =  $(this).attr('data-user-name');
    console.log(userName);
    var userId = $(this).attr('data-user-id');
    console.log(userId);
    var user = { name: userName, id: userId };

    // 追加したメンバーを削除
    $(this).parent().remove();
    
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${user.id}'>
                  <p class='chat-group-user__name'>${user.name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
  group_list.append(html);
  })
  
  

})