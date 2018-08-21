import gameReducer, { createFields, resetFloatFields, setFloatFields, toggleField, name } from '../game'


describe('Game module', () => {
  const getInitialState = () => ({
    rows: 6,
    cols: 12,
    fields: [],
    isGameRunning: false,
  })
  // Actions tests

  it('should be correct module name', () => {
    expect(name).toBe('@@game')
  })

  it('should create an action CREATE_FIELDS', () => {
    const expectedAction = {
      type: `[5] ${name}/CREATE_FIELDS`,
      payload: undefined,
      error: false,
    }

    const next = createFields()

    expect(next).toEqual(expectedAction)
  })

  it('should create an action CREATE_FIELDS', () => {
    const expectedAction = {
      type: `[4] ${name}/RESET_FLOAT_FIELDS`,
      payload: undefined,
      error: false,
    }

    const next = resetFloatFields()

    expect(next).toEqual(expectedAction)
  })

  it('should create an action SET_FLOAT_FIELDS', () => {
    const expectedAction = {
      type: `[3] ${name}/SET_FLOAT_FIELDS`,
      payload: undefined,
      error: false,
    }

    const next = setFloatFields()

    expect(next).toEqual(expectedAction)
  })

  it('should create an action TOGGLE_FIELD with id param', () => {
    const id = 'testId'

    const expectedAction = {
      type: `[2] ${name}/TOGGLE_FIELD`,
      payload: id,
      error: false,
    }

    const next = toggleField(id)

    expect(next).toEqual(expectedAction)
    expect(next.payload).toBe(id)
  })

  // End Actions tests

  // Reducers tests
  it('toggleField reducer is exist', () => {
    expect(gameReducer.has(toggleField)).toBe(true)
  })

  it('createFields reducer is exist', () => {
    expect(gameReducer.has(createFields)).toBe(true)
  })

  it('resetFloatFields reducer is exist', () => {
    expect(gameReducer.has(resetFloatFields)).toBe(true)
  })

  it('setFloatFields reducer is exist', () => {
    expect(gameReducer.has(setFloatFields)).toBe(true)
  })

  it('should create fields, createFields reducer', () => {
    const state = getInitialState()

    const expectedState = gameReducer(state, createFields())

    expect(expectedState.fields).toHaveLength(72)
  })

  it('toggleField reducer - should set active field', () => {
    const state = gameReducer(getInitialState(), createFields())
    const itemId = '5-10'

    const changedState = gameReducer(state, toggleField(itemId))
    const expectedItem = changedState.fields.find(item => item.id === itemId)

    expect(expectedItem.isActive).toBe(true)
  })

  it('toggleField reducer - should not set active field', () => {
    const state = gameReducer(getInitialState(), createFields())
    const itemId = '4-10'

    const changedState = gameReducer(state, toggleField(itemId))
    const expectedItem = changedState.fields.find(item => item.id === itemId)

    expect(expectedItem.isActive).toBe(false)
  })

  it('toggleField reducer - should set active field if clicked above active item', () => {
    let state = gameReducer(getInitialState(), createFields())
    const itemId = '5-10'
    const itemId2 = '4-10'

    state = gameReducer(state, toggleField(itemId))
    state = gameReducer(state, toggleField(itemId2))

    const expectedItem = state.fields.find(item => item.id === itemId2)

    expect(expectedItem.isActive).toBe(true)
  })

  it('toggleField reducer - should not set active field if had active item above', () => {
    let state = gameReducer(getInitialState(), createFields())
    const itemId = '5-10'
    const itemId2 = '4-10'

    state = gameReducer(state, toggleField(itemId))
    state = gameReducer(state, toggleField(itemId2))
    state = gameReducer(state, toggleField(itemId))

    const expectedItem = state.fields.find(item => item.id === itemId)

    expect(expectedItem.isActive).toBe(true)
  })

  it('setFloatFields reducer - should set ', () => {
    let state = gameReducer(getInitialState(), createFields())
    const itemId = '5-8'
    const itemId2 = '5-10'
    const expectedId = '5-9'

    state = gameReducer(state, toggleField(itemId))
    state = gameReducer(state, toggleField(itemId2))

    state = gameReducer(state, setFloatFields())

    const expectedItem = state.fields.find(item => item.id === expectedId)

    expect(expectedItem.isFloating).toBe(true)
  })

  it('resetFloatFields reducer - should not have float fields', () => {
    let state = gameReducer(getInitialState(), createFields())
    const itemId = '5-8'
    const itemId2 = '5-10'
    const expectedId = '5-9'

    state = gameReducer(state, toggleField(itemId))
    state = gameReducer(state, toggleField(itemId2))

    state = gameReducer(state, setFloatFields())
    state = gameReducer(state, resetFloatFields())

    const expectedItem = state.fields.find(item => item.id === expectedId)

    expect(expectedItem.isFloating).toBe(false)
  })

})