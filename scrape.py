import urllib2
from bs4 import BeautifulSoup
import re
import codecs
import json
from flask import Flask
from flask import render_template

#Grabs a random wikipedia article
app = Flask(__name__)

@app.route('/grab_article')
def grab_random_article():
    wiki_page = BeautifulSoup(urllib2.urlopen('http://en.wikipedia.org/wiki/Special:Random').read())
    wiki_page = wiki_page.findAll('p')
    
    #converting bs4 result set to unicode
    wiki_page = unicode.join(u'\n',map(unicode, wiki_page))
    
    #regular expression to get rid of all html tags
    tags = re.findall(r'<[^>]+>', wiki_page)
    
    #regular expression to remove all citations
    brackets = re.findall(r'\[\d\]', wiki_page)
    
    
    for i in tags:
        wiki_page = wiki_page.replace(i, '')    
    for i in brackets:
        print(i)
        wiki_page = wiki_page.replace(i, '')
        
    wiki_page = wiki_page.split(" ")
    
    wiki_json = json.JSONEncoder(ensure_ascii = False).encode(wiki_page)
    
    f = codecs.open('wiki_page', 'w', "utf-8")
    f.write(wiki_json)
    f.close()
    
    
    return wiki_json

@app.route('/')
def main_page(name=None):
    return render_template('index.html', name=name)

if __name__ == '__main__':
    app.run()

