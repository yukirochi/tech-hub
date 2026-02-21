import redis

rs = redis.Redis(host='localhost', port=6379, decode_responses=False)

def get_cached_image(key):
    cached_data = rs.get(key)
    if cached_data:
        return cached_data
    else:
        return False
    
def set_cached_image(key, data, expire_time=3600):
    rs.setex(key, expire_time, data)
    return True