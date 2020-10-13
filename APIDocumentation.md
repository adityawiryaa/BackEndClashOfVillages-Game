# 1. Register

Feature for register. Schema user is:


```
  Endpoint : 
 # POST : user/signup
 # req.body
    {
      username: <user_username>
      email: <user_email>
      password: <user_password>
    }
```

email,password : required.

username and password minlenght :6.

email must @ (validation).

# 2. Login

Feature login. Schema user is :

```
 Endpoint: 
 # POST : user/signin
 # req.body
    {
      email: <user_email>,
      password: <user_password>
    }
 # if success you will get token to access other feature
```

# 3. User

When user registration, automatically user create Townhall and user will get medal, resource : 100 golds , 100 foods and 0 soldier. User just have one townhall.

```
  {
    username: <user_username>
    townhall: <user_townhall>
    email: <user_email>,
    password: <user_password>,
    resources: {
      gold: 100,
      food: 100,
      soldier: 0
    }
    medal: 0
  }
```

# A. To Know One data user

```
# Endpoint GET: user/:userID
# req.headers : token
Example : (token : yourtoken )
 Output:
 {
   Yourdata
 }
```

# B. To change or update data user

```
Endpoint : 
# PUT : user/userID
# req.headers : token
  example : (token : yourtoken )
# req.body :
{
    username: <user_username>
    townhall: <user_townhall>
}
```

# 4. Market

Cost for create Market is 30 golds dan 10 foods.

Then market can generate coins / product coins

Market will produce 1 gold/minute.

Market has a capacity of 20 golds.

1 User can create much market if have resource sufficient
you can name your market.

Endpoint:

# A. To create a market

```
# POST : user/market/:userID
# req.headers : token
example : (token : yourtoken)
# req.body :
{
    namemarket : <user_namemarket>
}
```

# B. To know user have list market

```
# GET : user/market/list/:userID
# req.headers : token
example : (token : yourtoken )
```

# C. To know one market and know how much coins was generate

```
# GET : user/market/:marketID
# req.headers : token
example : (token : yourtoken )
```

# D. To update and change name market

```
# PUT : user/market/:marketID
# req.headers : token
# req.body :
{
  namemarket : <user_namemarket>
}
```

# E To delete the market

```
# DELETE :  user/market/:marketID
# req.headers : token
```

# F. To collect coins in market and send to your resource

```
# GET : user/market/:marketID/collect
# req.headers : token
```

# 5. Farm

Cost to create Farm is 10 golds and 30 foods.

Farm will produce 1 food/minute.

Farm has a capacity of 20 foods.

1 User can create much market if have resource sufficient
you can name your farm

Endpoint:

# A. To create a farm

```
# POST : user/farm/:userID
# req.headers : token
example : (token : yourtoken)
# req.body :
{
    namefarm : <user_namefarm>
}
```

# B. To know user have list farm

```
# GET : user/farm/list/:userID
# req.headers : token
example : (token : yourtoken )
```

# C. To know one farm and know how much coins was generate

```
# GET : user/farm/:farmID
# req.headers : token
example : (token : yourtoken )
```

# D. To update and change name farm

```
# PUT : user/farm/:farmID
# req.headers : token
# req.body :
{
  namefarm : <user_namefarm>
}
```

# E To delete the farm

```
# DELETE :  user/farm/:farmID
# req.headers : token
```

# F. To collect coins in farm and send to your resource

```
# GET : user/farm/:farmID/collect
# req.headers : token
```

# 6. Barrack

Cost to build Barrack is 30 golds dan 30 foods.

Barrack produce 1 soldier/minute.

Barrack has capacity 10 soldiers.

1 User can create much market if have resource sufficient
you can name your barrack

Endpoint:

# A. To create a barrack

```
# POST : user/barrack/:userID
# req.headers : token
example : (token : yourtoken)
# req.body :
{
    namebarrack : <user_namebarrack>
}
```

# B. To know user have list barrack

```
# GET : user/barrack/list/:userID
# req.headers : token
example : (token : yourtoken )
```

# C. To know one barrack and know how much coins was generate

```
# GET : user/barrack/:barrackID
# req.headers : token
example : (token : yourtoken )
```

# D. To update and change name barrack

```
# PUT : user/barrack/:barrackID
# req.headers : token
# req.body :
{
  namebarrack : <user_namebarrack>
}
```

# E. To delete the barrack

```
# DELETE :  user/barrack/:barrackID
# req.headers : token
```

# F. To collect coins in barrack and send to your resource

```
# GET : user/barrack/:barrackID/collect
# req.headers : token
```

# 7. Attack other user

User can attack other user for get the resource on Townhall their.

Success will be random,between success and failure on the basis of success is determined based on the number of soldiers sent.

If attack success/attacker win :

- Attacker: get 5 medal.
- Attacker: get half from golds dan foods on Townhall enemy/defender.
- Defender: soldier will be 0.

If attack failed/attacker lose :

- Attacker: half medal will be lost (round down, if current 5 will be 2)
- Defender: get 2 medal
- Defender: soldier will lost 20

EndPoint :

```
POST : user/:userID/attack/:enemyID
Request Body:
  {
    soldierattack : <sendsoldier>
  }
```

Notes:

- Soldiers on send, both successful and failed attacks will disappear.

# Other feature :

- Townhall just can accommodate 1000 golds, 1000 foods dan 500 soldiers.

- User just can create maximal 30 barracks.

- Users with the number of soldiers on Townhall below 50 cannot be attacked.
