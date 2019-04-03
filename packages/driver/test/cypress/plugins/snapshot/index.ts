import * as snapshotCore from "snap-shot-core"
import * as _ from 'lodash'


export class Snapshot {

	private snapshotIndex = {}

	constructor(private on: Function) {}

	snapshotRestore = () => {
		// snapshotCore.restore()
		this.snapshotIndex = {}
		return null
	}

	// export function
	getSnapshot = (opts: {
		what: any,
		file: string,
		specName: string,
		store?: Function
		compare?: Function
	}) => {
		let result = null

		this.snapshotIndex[opts.specName] = (this.snapshotIndex[opts.specName] || 0) + 1

		opts = _.defaults(opts, {
			what: 'aaaaa',
			exactSpecName: `${opts.specName} #${this.snapshotIndex[opts.specName]}`
		})

		opts = _.assign(opts, {
			compare: ({ expected, value }) => {
				result = expected
				throw new Error('bail')
			},
			opts: {
				update: false,
				ci: true,
			}
		})

		try {
			snapshotCore.core({
				...opts
			})
		} catch (e) {
		}

		return result


	}

	saveSnapshot = (opts) => {
		opts = _.defaults(opts, {
			exactSpecName: `${opts.specName} #${this.snapshotIndex[opts.specName]}`,
		})
		return snapshotCore.core({
			...opts,
			opts: {
				update: true,
			}
		})
	}

}
