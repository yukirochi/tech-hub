import redis

rs = redis.Redis(host='localhost', port=6379, decode_responses=False)

def get_cached_text(key, data, expire_time=3600):
    
    cached_data = rs.get(key)
    
    if cached_data:
        return cached_data
    else:
        
        rs.setex(key, expire_time, data)
        
        return cached_data
