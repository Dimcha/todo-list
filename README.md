## Database:
```
CREATE DATABASE todo_list;
CREATE TABLE tasks (
  id int(11) NOT NULL AUTO_INCREMENT,
  value varchar(255),
  checked boolean not null default 0,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;
```

## To start:
1. npm install
2. npm start
3. Go to `localhost:3000`
