# RedisRecap

### Installing Redis

`brew install redis`
`redis-server /usr/local/etc/redis.conf`


### Using the CLI

`redis-cli`

### Datatypes

- Lists 
- Sets 
- Sorted Sets
- Hashes 


### Lists

**LPUSH**

- Add a member to the left of a list

**RPUSH**

- Add a member to the right of a list

**LRANGE**

- Returns specified elements of the list
- Offsets are zero-based indexes
- Offsets can be negative indicating
offsets starting from the end of the list

**LLEN**

- Return the length of the list 

**LPOP**

- Removes and returns the first element of a list

**RPOP**

- Removes and returns the last element of a list

**LINSERT**

- Command inserts the value in the list stored at the key either before or after the reference value pivot.  

### Sets  
### Sorted Sets
### Hashes 