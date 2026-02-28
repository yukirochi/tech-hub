import time
from typing import Optional, Dict, Tuple, Union

# In-memory cache: {key: (data, expiry_time)}
_cache: Dict[str, Tuple[Union[str, bytes], float]] = {}

def get_cached_image(key: str) -> Optional[Union[str, bytes]]:
    """Get cached image data if it exists and hasn't expired"""
    if key in _cache:
        data, expiry_time = _cache[key]
        if time.time() < expiry_time:
            return data
        else:
            # Remove expired entry
            del _cache[key]
    return False

def set_cached_image(key: str, data: Union[str, bytes], expire_time: int = 3600) -> bool:
    """Set cached image data with expiry time"""
    expiry_time = time.time() + expire_time
    _cache[key] = (data, expiry_time)
    return True