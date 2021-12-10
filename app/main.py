from flask import Flask
from flask import render_template

app = Flask(__name__)
app = Flask(__name__, template_folder='template')

@app.route('/')
def index(name='🇰🇿'):
    return render_template('index.html', name=name)


if __name__ == '__main__':
    app.debug = True
    app.run(host="0.0.0.0")
