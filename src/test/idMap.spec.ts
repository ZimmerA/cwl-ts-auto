import { assert } from 'chai'
import { IdMapLoader, Loader, LoadingOptions, ValidationException } from '../util/internal'

class TestLoader implements Loader {
  async load (doc: any, baseuri: string, loadingOptions: LoadingOptions, docRoot?: string | undefined): Promise<any> {
    return doc
  }
}
const testLoader = new TestLoader()

describe('Test IdMapLoader', () => {
  describe('load', () => {
    it('should load the document', async () => {
      const loader = new IdMapLoader(testLoader, 'key', 'value')
      const doc = {
        shaggy: {
          value: 'scooby'
        },
        fred: 'daphne',
        velma: ['fred', 'candy']
      }
      assert.deepEqual(await loader.load(doc, '', new LoadingOptions({})), [
        { value: 'daphne', key: 'fred' },
        { value: 'scooby', key: 'shaggy' },
        { value: ['fred', 'candy'], key: 'velma' }
      ])
    })
    it('should throw a ValidationException with the message "No mapPredicate"', async () => {
      const loader = new IdMapLoader(testLoader, 'key')
      const doc = {
        fred: 'daphne'
      }
      let err
      try {
        await loader.load(doc, '', new LoadingOptions({}))
      } catch (e) {
        err = e
      }
      assert.exists(err)
      assert.isTrue(err instanceof ValidationException)
      assert.equal((err as ValidationException).message, 'No mapPredicate')
    })
  })
})
