import Helper from './helper'
import Config from './config'
import SketchEngine from './sketch-engine'
import SketchEngineCorpora from './sketch-engine-corpora'

export default {
  corpora: SketchEngineCorpora,
  corpname(lang) {
    if (lang) {
      let corpnames = JSON.parse(localStorage.getItem('ezhCorpnames') || '{}')
      let defaultCorpusName = 'preloaded/ententen15_tt21'
      let corpname = corpnames[lang] || defaultCorpusName
      return corpname
    }
  },
  collocationDescription(word) {
    return {
      'objects of "%w"': 'objects of "{word}"', 
      'subjects of "%w"': 'subjects of "{word}"', 
      '"%w" and/or ...': '"{word}" and/or ...', 
      'prepositional phrases': 'prepositional phrases', 
      'pronominal objects of "%w"': 'pronominal objects of "{word}"', 
      'nouns modified by "%w"': 'nouns modified by "{word}"', 
      'verbs with "%w" as object': 'verbs with "{word}" as object', 
      'verbs with "%w" as subject': 'verbs with "{word}" as subject', 
      'adjective predicates of "%w"': 'adjective predicates of "{word}"', 
      '"%w" is a ...': '"{word}" is a ...', 
      '%w\'s ...': '{word}\'s ...', 
      'possessors of "%w"': 'possessors of "{word}"', 
      'pronominal possessors of "%w"': 'pronominal possessors of "{word}"', 
      'usage patterns': 'usage patterns', 
      '... is a "%w"': '... is a "{word}"', 
      'verbs with particle "up" and "%w" as object': 'verbs with particle "up" and "{word}" as object', 
      'verbs with particle "out" and "%w" as object': 'verbs with particle "out" and "{word}" as object', 
      'verbs with particle "down" and "%w" as object': 'verbs with particle "down" and "{word}" as object', 
      'verbs with particle "off" and "%w" as object': 'verbs with particle "off" and "{word}" as object', 
      'verbs with particle "over" and "%w" as object': 'verbs with particle "over" and "{word}" as object', 
      'modifiers of "%w"': 'modifiers of "{word}"', 
      'infinitive objects of "%w"': 'infinitive objects of "{word}"', 
      'verbs complemented by "%w"': 'verbs complemented by "{word}"', 
      'verbs before "%w"': 'verbs before "{word}"', 
      'subjects of "be %w"': 'subjects of "be {word}"', 
      'verbs with particle "away" and "%w" as object': 'verbs with particle "away" and "{word}" as object'
    }
  },
  collocationDescriptionBackup(word) {
    return {
      'object_of': 'object_of',
      'subject_of': 'subject_of',
      'adj_subject_of': 'adj_subject_of',
      'modifier': 'modifier',
      'modifies': 'modifies',
      'and/or': 'and/or',
      'pp_obj_%s': `pp_obj_${word}`,
      'pp_%s': `pp_${word}`,
      'predicate': 'predicate',
      'possessor': 'possessor',
      'part_%s': `part_${word}`,
      'predicate_of': 'predicate_of',
      'object': 'object',
      'subject': 'subject',
      'part_trans': 'part_trans',
      'part_intrans': 'part_intrans',
      'usage patterns': 'usage patterns',
      'pro_subject': 'pro_subject',
      'pro_object': 'pro_object',
      'adj_comp': 'adj_comp',
      'part_%s_obj': `part_${word}_obj`,
      'infin_comp': 'infin_comp',
      'wh_comp': 'wh_comp',
      'np_adj_comp': 'np_adj_comp',
      'ing_comp': 'ing_comp',
      'adj_subject': 'adj_subject',
      'adj_comp_of': 'adj_comp_of',
      'np_adj_comp_of': 'np_adj_comp_of'
    }
  },
  wsketch(options) {
    return new Promise(resolve => {
      $.getJSON(
        `${
          Config.sketchEngineProxy
        }?https://api.sketchengine.eu/bonito/run.cgi/wsketch?corpname=${this.corpname(
          options.lang
        )}&lemma=${options.term}`,
        function(response) {
          if (response.data.Gramrels && response.data.Gramrels.length > 0) {
            response.data.Gramrels.forEach(function(Gramrel) {
              Gramrel.Words = Gramrel.Words.filter(function(Word) {
                return Word.cm !== ''
              })
              for (let Word of Gramrel.Words) {
                if (Word.cm) {
                  Word.cm = Word.cm.replace(/-\w( ?)/gi, '')
                }
              }
            })
          }
          resolve(response.data)
        }
      )
    })
  },
  concordance(options) {
    let corpus = this.corpora.find(corpus => corpus.corpname === this.corpname(options.lang))
    let parallel = corpus.aligned && corpus.aligned.length > 0
    let requestJSON = parallel
      ? `{"attrs":"word","structs":"s,g","refs":"=doc.subcorpus","ctxattrs":"word","viewmode":"align","usesubcorp":"","freqml":[{"attr":"word","ctx":"0","base":"kwic"}],"fromp":1,"pagesize":1000,"concordance_query":[{"queryselector":"iqueryrow","sel_aligned":["opus2_${options.lang}"],"cql":"","iquery":"${options.term}","queryselector_opus2_${options.lang}":"iqueryrow","iquery_opus2_${options.lang}":"","pcq_pos_neg_opus2_${options.lang}":"pos","filter_nonempty_opus2_${options.lang}":"on"}]}`
      : `{"lpos":"","wpos":"","default_attr":"word","attrs":"word","refs":"=doc.website","ctxattrs":"word","attr_allpos":"all","usesubcorp":"","viewmode":"kwic","cup_hl":"q","cup_err":"true","cup_corr":"","cup_err_code":"true","structs":"s,g","gdex_enabled":0,"fromp":1,"pagesize":50,"concordance_query":[{"queryselector":"iqueryrow","iquery":"${options.term}"}],"kwicleftctx":"100#","kwicrightctx":"100#"}`
    return new Promise(resolve => {
      $.post(
        `${
          Config.sketchEngineProxy
        }?https://app.sketchengine.eu/bonito/run.cgi/concordance?corpname=${this.corpname(
          options.lang
        )}`,
        {
          json: requestJSON
        },
        function(response) {
          try {
            const data = JSON.parse(response).data
            var result = []
            for (let Line of data.Lines.slice(0, 500)) {
              let line =
                Line.Left.map(item => (item ? item.str : '')).join(' ') +
                ' ' +
                Line.Kwic[0].str +
                ' ' +
                Line.Right.map(item => (item ? item.str : '')).join(' ')
              line = line.replace(/ ([,.])/g, '$1')
              if (line.length > options.term.length + 4) {
                let parallelLine = {
                  english: line
                }
                if (Line.Align && Line.Align[0].Kwic) {
                  parallelLine.l1 = Line.Align[0].Kwic.map(
                    kwic => kwic.str
                  ).reduce((l1, kwic) => l1 + ' ' + kwic)
                }
                result.push(parallelLine)
              }
            }
            result = result.sort(function(a, b) {
              return a.english.length - b.english.length
            })
            resolve(Helper.unique(result))
          } catch (err) {
            throw 'Concordance did not return any data.'
          }
        }
      )
    })
  },
  thesaurus(options, callback) {
    $.post(
      `${
        Config.sketchEngineProxy
      }?https://app.sketchengine.eu/bonito/run.cgi/thes?corpname=${this.corpname(options.lang)}`,
      {
        lemma: options.term,
        lpos: '',
        clusteritems: 0,
        maxthesitems: 100,
        minthesscore: 0,
        minsim: 0.3
      },
      function(response) {
        let data = {}
        try {
          data = JSON.parse(response).data
        } catch (err) {
          throw 'Error in thesaurus'
        }
        callback(data)
      }
    )
  },
  mistakes(options, callback) {
    $.post(
      `${Config.sketchEngineProxy}?https://app.sketchengine.eu/bonito/run.cgi/concordance?corpname=preloaded/guangwai`,
      {
        json: JSON.stringify({
          lpos: '',
          wpos: '',
          default_attr: 'word',
          attrs: 'word',
          refs: SketchEngine.mistakeRefKeys.join(','),
          ctxattrs: 'word',
          attr_allpos: 'all',
          usesubcorp: '',
          viewmode: 'kwic',
          cup_hl: 'q',
          cup_err: '',
          cup_corr: '',
          cup_err_code: '',
          structs: 's,g',
          gdex_enabled: 0,
          fromp: 1,
          pagesize: 50,
          concordance_query: [
            {
              queryselector: 'iqueryrow',
              iquery: options.term,
              'sca_err.level': ['col', 'form', 'mean', 'orth', 'punct'],
              'sca_err.type': ['anom', 'incl', 'omit', 'wo']
            }
          ],
          kwicleftctx: '100#',
          kwicrightctx: '100#'
        })
      },
      function(response) {
        const data = JSON.parse(response).data
        let results = []
        for (let Line of data.Lines) {
          try {
            const ml = Line.Left.map(function(item) {
              return item.str || item.strc
            })
              .join('')
              .match(/(.*)<s>([^<s>]*?)$/)
            const left = ml[2]
            const leftContext = ml[1].replace(/<s>/g, '').replace(/<\/s>/g, '')
            let mr = Line.Right.map(function(item) {
              return item.str || item.strc
            })
              .join('')
              .match(/^([^</s>]*)<\/s>(.*)/)
            const right = mr[1]
            const rightContext = mr[2].replace(/<s>/g, '').replace(/<\/s>/g, '')
            var refs = {}
            for (let i in Line.Refs) {
              refs[SketchEngine.mistakeRefKeys[i]] = Line.Refs[i]
            }
            const country = refs['=text.id'].replace(
              /^[^_]*_[^_]*_[^_]*_[^_]*_([^_]*).*/g,
              '$1'
            )
            results.push({
              left: left,
              right: right,
              leftContext: leftContext,
              rightContext: rightContext,
              text: left + options.term + right,
              country: Helper.country(country),
              refs: refs,
              proficiency: SketchEngine.proficiency[refs['=u.proficiency']],
              errorType: SketchEngine.errors[refs['=err.type']],
              errorLevel: SketchEngine.errors[refs['=err.level']],
              l1: refs['=u.l1']
            })
          } catch (err) {
            console.log(err)
          }
        }
        results = results.sort(function(a, b) {
          return a.text.length - b.text.length
        })
        callback(results)
      }
    )
  }
}
