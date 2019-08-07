#chat-space DB設計

## groupsテーブル

|Column|Type|Options|
|---|---|---|
|name|string|null: false|


### Association
- has_many : members
- has_many :users, through: :members
- has_many :messages

## usersテーブル

|Column|Type|Options|
|---|---|---|
|name|string|null:false|
|email|string|null: false|
|passwored|string|null: false|

### Association
- has_many :members
- has_many :groups, through: :members
- has_many :messages

## messagesテーブル

|Column|Type|Options|
|---|---|---|
|body|text| |
|image|string| |
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## menbersテーブル

|Column|Type|Options|
|---|---|---|
|group_id|integer|null:false, foreign_key: true|
|user_id|integer|null:false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

