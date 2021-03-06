$(function() {
  // 入力したメンバー名を表示するDOMを取得する
  var search_list = $('#user-search-result');
  var group_list = $('#js-chat-member');
  //検索と合うユーザーをサーチ結果のリストに追加する関数
  function appendList(user) {
    if(member_names.indexOf(user.name) === -1){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
    }
    // }
  }
  // 検索後、追加ボタンを押されたユーザーをグループメンバーのリストに追加する関数
  function appendUser(user) {
    member_names.push(user.name)
    var html = `<div class='chat-group-user clearfix'>
                  <input name='group[user_ids][]' type='hidden' value='${user.id}'>
                  <p class='chat-group-user__name js-added-user-name'>${user.name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    group_list.append(html);
  }

  //ajaxで帰ってきた値が空の場合のHTMLを生成する関数
  function appendErrorMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    search_list.append(html);
  }

var member_names = []
  

  // 検索フォームに入力があったら
  $('#user-search-field').on('keyup', function() {
    var target = $('#user-search-field').val();
    var group_id = $('.chat__group_id').attr('value');
    var url = '/users/search'
 

  // 送信するデータを生成する
      $.ajax({
        url: url,
        type: 'GET',
        data: {keyword: target, groupId: group_id},
        dataType: 'json'
      })
    
    //非同期通信で期待するデータが帰ってきた
    .done(function(users) {
      $("#user-search-result").empty();
      if (target.length !== 0){
        if (users.length !== 0) {
          users.forEach(function (user) {
              appendList(user);
           
          })
        } else {
          appendErrorMsgToHTML("一致するユーザーはいません");

        }
      }
    })
    // エラーが帰ってきた
    .fail(function(){
      alert('検索に失敗しました');
    })
  })

    // 追加ボタンを押すと
  $(document).on('click', '.chat-group-user__btn--add', function(){
    // 追加したメンバーを取得してオブジェクトにする
    var user_name = $(this).data('user-name');
    var user_id = $(this).data('user-id');
    var user = { name: user_name, id: user_id };
    // 追加したメンバーを削除
    $(this).parent().remove();
    // ユーザーをグループリストに追加
    appendUser(user);
  })
  
  // 削除ボタンを押すと
  $(document).on('click', '.js-remove-btn', function() {
    var name = $(this).prev().text();
    for(i=0; i < member_names.length; i++){
      if(member_names[i] == name){
          //spliceメソッドで要素を削除
          member_names.splice(i, 1);
      }
  }
    // 追加リストからメンバーを削除
    $(this).parent().remove();
  })
})




