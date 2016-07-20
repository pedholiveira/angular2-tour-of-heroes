import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
	
@Injectable()
export class HeroService {
	private heroesUrl = 'app/heroes';
	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http: Http){
	}

	getHeroes(): Promise<Hero[]> {
		return this.http.get('app/heroes')
						.toPromise()
						.then(response => response.json().data as Hero[])
						.catch(this.handleError);
	}

	getHero(id: number) {
		return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
	}

	save(hero: Hero): Promise<Hero>  {
  		if (hero.id) {
    		return this.put(hero);
  		}
  		return this.post(hero);
	}

	delete(hero: Hero) {
  		let url = `${this.heroesUrl}/${hero.id}`;

  		return this.http.delete(url, this.headers)
             			.toPromise()
             			.catch(this.handleError);
	}

	private post(hero: Hero): Promise<Hero> {
	  	return this.http.post(this.heroesUrl, JSON.stringify(hero), {headers: this.headers})
	            		.toPromise()
	            		.then(res => res.json().data)
	            		.catch(this.handleError);
	}

	private put(hero: Hero) {
	  	let url = `${this.heroesUrl}/${hero.id}`;

	  	return this.http
	            .put(url, JSON.stringify(hero), {headers: this.headers})
	            .toPromise()
	            .then(() => hero)
	            .catch(this.handleError);
	}

	private handleError(error: any) {
		console.error('An error occurred', error);
	  	return Promise.reject(error.message || error);
	}
}