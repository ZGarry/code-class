import os
import json
import base64
import sqlite3
from win32crypt import CryptUnprotectData
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

# 加密和解密方式，都被搞定了


# 反向解决了加密的方式，如果这行脚本在，可以模拟别人的登陆，攻击别人的登陆行为
def get_string(local_state):
    with open(local_state, 'r', encoding='utf-8') as f:
        s = json.load(f)['os_crypt']['encrypted_key']
    return s


def pull_the_key(base64_encrypted_key):
    encrypted_key_with_header = base64.b64decode(base64_encrypted_key)
    encrypted_key = encrypted_key_with_header[5:]
    key = CryptUnprotectData(encrypted_key, None, None, None, 0)[1]
    return key


def decrypt_string(key, data):
    nonce, cipherbytes = data[3:15], data[15:]
    aesgcm = AESGCM(key)
    plainbytes = aesgcm.decrypt(nonce, cipherbytes, None)
    plaintext = plainbytes.decode('utf-8')
    return plaintext


# 获取本地的cookies存储位置。然后用这个cookies去干一些事情，这样保存cookies就变得更加简单了
def get_cookie_from_chrome(host: '.oschina.net'):
    print(os.environ['LOCALAPPDATA'])
    local_state = os.environ['LOCALAPPDATA'] + \
        r'\Google\Chrome\User Data\Local State'
    cookie_path = os.environ['LOCALAPPDATA'] + \
        r"\Google\Chrome\User Data\Default\Network\Cookies"

    sql = f"select host_key,name,encrypted_value from cookies where host_key like '%{host}'"

    # 链接不上，请检查浏览器是否关闭
    with sqlite3.connect(cookie_path, check_same_thread=False) as conn:
        cu = conn.cursor()
        res = cu.execute(sql).fetchall()
        cu.close()
        cookies = {}
        key = pull_the_key(get_string(local_state))
        for host_key, name, encrypted_value in res:
            if encrypted_value[0:3] == b'v10':
                cookies[name] = decrypt_string(key, encrypted_value)
            else:
                cookies[name] = CryptUnprotectData(encrypted_value)[1].decode()

        print(cookies)
        return cookies


get_cookie_from_chrome(".jisilu.cn")
