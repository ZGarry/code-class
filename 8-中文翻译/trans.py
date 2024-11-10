# 这个可以用于批量替换进行翻译
# 将一些国内内容翻译到外网食用
from translate import Translator

translator = Translator(to_lang="en", from_lang="zh-cn")
translation = translator.translate("一个轻量级的翻译库，基于 MyMemory 翻译服务。")
print(translation)  # Output: "Hola, ¿cómo estás?"
