import { Dictionary, expandUrl, loadField, unionOfNoneTypeOrStrtype, LoadingOptions, Saveable, ValidationException } from './util/internal'

export class Simple_schema extends Saveable {
  loadingOptions: LoadingOptions
  label?: string
  extensionFields?: Dictionary<any>

  constructor (loadingOptions: LoadingOptions, label?: string, extensionFields?: Dictionary<any>) {
    super()
    this.loadingOptions = loadingOptions
    this.label = label
    this.extensionFields = extensionFields
  }

  static override async fromDoc (doc: any, baseuri: string, loadingOptions: LoadingOptions, docRoot?: string): Promise<Saveable> {
    const _doc = Object.assign({}, doc)

    const errors: ValidationException[] = []
    if ('label' in _doc) {
      try {
        var label: string | undefined = await loadField(_doc.label, unionOfNoneTypeOrStrtype, '', loadingOptions)
      } catch (e) {
        if (e instanceof ValidationException) {
          errors.push(new ValidationException('the `label` field is not valid because: ', [e]))
        }
      }
    }

    const extensionFields: Dictionary<any> = {}
    for (const [key, value] of _doc) {
      if (!this.attr.has(key)) {
        if ((key as string).includes(':')) {
          const ex = expandUrl(key, '', loadingOptions, false, false)
          extensionFields[ex] = value
        } else {
          errors.push(new ValidationException(`invalid field ${key as string}, expected one of: \`label\``))
          break
        }
      }
    }

    if (errors.length >= 1) {
      throw new ValidationException("Trying 'Simple_schema'", errors)
    }

    const schema = new Simple_schema(loadingOptions, label, extensionFields)
    return schema
  }

  static attr: Set<string> = new Set(['label'])
}
