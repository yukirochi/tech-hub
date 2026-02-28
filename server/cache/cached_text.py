import time
from typing import Optional, Dict, Tuple

# In-memory cache: {key: (data, expiry_time)}
_cache: Dict[str, Tuple[str, float]] = {}

def get_cached_text(key: str, data: str = None, expire_time: int = 3600) -> Optional[str]:
    """Get cached text data if it exists and hasn't expired"""
    if key in _cache:
        cached_data, expiry_time = _cache[key]
        if time.time() < expiry_time:
            return cached_data
        else:
            # Remove expired entry
            del _cache[key]
    
    # If data is provided and not cached, cache it
    if data is not None:
        set_cached_text(key, data, expire_time)
    
    return None

def set_cached_text(key: str, data: str, expire_time: int = 3600) -> bool:
    """Set cached text data with expiry time"""
    expiry_time = time.time() + expire_time
    _cache[key] = (data, expiry_time)
    return True
