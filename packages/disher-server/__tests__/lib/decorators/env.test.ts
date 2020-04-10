import 'jest'
import { Env } from '../../../src/lib/decorators/env'

process.env.A_STRING = 'a string'
process.env.A_BOOLEAN = 'true'
process.env.A_FLOAT = '3.14'
process.env.A_INT = '10'
// NOTE: The space between `,` and `b` is intentional
process.env.A_ARRAY = 'a, b,c'
process.env.A_JSON = `
  {
    "a": 1,
    "b": 2,
    "c": {
      "a": "1",
      "b": "2"
    }
  }
`

class C {
  @Env('A_STRING')
  public get aString(): string | undefined {
    return undefined
  }

  @Env('A_BOOLEAN', Env.Boolean)
  public get aBoolean(): boolean {
    return false
  }

  @Env('A_FLOAT', Env.Float)
  public get aFloat(): number {
    return 0
  }

  @Env('A_INT', Env.Int)
  public get aInt(): number {
    return 0
  }

  @Env('A_ARRAY', Env.Array)
  public get aArray(): string[] {
    return []
  }

  @Env('A_JSON', Env.Json)
  public get aJson(): { [key: string]: unknown } {
    return {}
  }
}

const c = new C()

describe('lib/decorators/env', () => {
  test('String/default type is handled', () => {
    expect(typeof c.aString).toBe('string')
    expect(c.aString).toEqual('a string')
  })

  test('Boolean type is handled', () => {
    expect(typeof c.aBoolean).toBe('boolean')
    expect(c.aBoolean).toEqual(true)
  })

  test('Float type is handled', () => {
    expect(typeof c.aFloat).toBe('number')
    expect(c.aFloat).toEqual(3.14)
  })

  test('Int type is handled', () => {
    expect(typeof c.aInt).toBe('number')
    expect(c.aInt).toEqual(10)
  })

  test('Array type is handled', () => {
    expect(Array.isArray(c.aArray)).toBe(true)
    expect(c.aArray).toEqual(['a', 'b', 'c'])
  })

  test('Json type is handled', () => {
    expect(typeof c.aJson).toBe('object')
    expect(c.aJson).toEqual({ a: 1, b: 2, c: { a: '1', b: '2' } })
  })
})
