import { Dictionary } from './util/dict'
import { expandUrl, loadField } from './util/loader'
import { idmapFieldsUnionOfNoneTypeOrArrayOfRecordFieldLoader, typeDSLEnumd9cba076fca539106791a4f46d198c7fcfbdb779Loader2 } from './util/loaderInstances'
import { LoadingOptions } from './util/loadingOptions'
import Saveable from './util/saveable'
import { ValidationException } from './util/validationException'

export class RecordSchema extends Saveable {
  fields?: any
  type: any
  extensionFields?: Dictionary<any>
  loadingOptions?: LoadingOptions

  constructor (type: any, fields?: any, extensionFields?: Dictionary<any>, loadingOptions?: LoadingOptions) {
    super()
    this.extensionFields = extensionFields ?? {}
    this.loadingOptions = loadingOptions ?? new LoadingOptions({})
    this.fields = fields
    this.type = type
  }

  static async fromDoc (doc: any, baseuri: string, loadingOptions: LoadingOptions, docRoot?: string): Promise<Saveable> {
    const _doc = Object.assign({}, doc)
    const errors: ValidationException[] = []
    if ('fields' in _doc) {
      try {
        var fields = await loadField(_doc.fields, idmapFieldsUnionOfNoneTypeOrArrayOfRecordFieldLoader, baseuri, loadingOptions)
      } catch (e) {
        if (e instanceof ValidationException) {
          errors.push(new ValidationException('the `fields` field is not valid because: ', [e]))
        }
      }
    } else {
      fields = undefined
    }
    let type
    try {
      type = await loadField(_doc.type, typeDSLEnumd9cba076fca539106791a4f46d198c7fcfbdb779Loader2, baseuri, loadingOptions)
    } catch (e) {
      if (e instanceof ValidationException) {
        errors.push(new ValidationException('the `type` field is not valid because: ', [e]))
      }
    }

    const extensionFields: Dictionary<any> = {}
    for (const [key, value] of _doc) {
      if (!this.attr.has(key)) {
        if ((key as string).includes(':')) {
          const ex = expandUrl(key, '', loadingOptions, false, false)
          extensionFields[ex] = value
        } else {
          errors.push(new ValidationException(`invalid field ${key as string}, expected one of: \`fields\`, \`type\``))
          break
        }
      }
    }

    if (errors.length >= 1) {
      throw new ValidationException("Trying 'RecordSchema'", errors)
    }

    const schema = new RecordSchema(type, fields, extensionFields, loadingOptions)
    return schema
  }

  static attr: Set<string> = new Set(['fields', 'type'])
}
