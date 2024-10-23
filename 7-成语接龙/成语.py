# 成语接龙小游戏
import random
with open('成语.txt', 'r', encoding='utf-8') as file:
    data = file.readlines()

data = [idiom.strip() for idiom in data]

lastIdiom = random.choice(data)

while True:
    # 读取成语
    idiom = input("机器人提供的词汇是" + lastIdiom + ",请输入一个成语：")
    # 检查成语是否在成语.txt文件中
    if idiom not in data:
        print("成语接龙失败！这不是一个成语")
        break
    if lastIdiom[-1] != idiom[0]:
        print("你没有接上对方的词汇")
        break

    kaitou = idiom[-1]
    for words in data:
        if words[0] == kaitou:
            print("机器人说：" + words)
            last = words
            break
